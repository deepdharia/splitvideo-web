import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  FolderOpen,
  Pause,
  Play,
  Plus,
  Scissors,
  Share2,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/timeline";
import { downloadBlob, shareFiles, zipBlobs } from "@/lib/download";
import {
  MAX_CLIPS,
  WARN_BYTES,
  canTranscodeH264,
  explainError,
  probeFile,
  rangesForInterval,
  rangesForMarkers,
  rangesForParts,
  splitRanges,
  type ClipResult,
  type MediaInfo,
  type SplitRange,
} from "@/lib/media";
import { clamp, formatBytes, formatTime } from "@/lib/time";
import { cn } from "@/lib/utils";

type Mode = "range" | "parts" | "interval" | "markers";

const MODES: { id: Mode; label: string }[] = [
  { id: "range", label: "Range" },
  { id: "parts", label: "Equal parts" },
  { id: "interval", label: "Every N sec" },
  { id: "markers", label: "Cut points" },
];

export function SplitterApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [info, setInfo] = useState<MediaInfo | null>(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [mode, setMode] = useState<Mode>("range");
  const [parts, setParts] = useState(3);
  const [interval, setIntervalSec] = useState(15);
  const [markers, setMarkers] = useState<number[]>([]);
  const [transcode, setTranscode] = useState(false);
  const [canH264, setCanH264] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ clipIndex: 0, clipCount: 1, fraction: 0 });
  const [clips, setClips] = useState<ClipResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [probeError, setProbeError] = useState<string | null>(null);

  useEffect(() => {
    void canTranscodeH264().then(setCanH264);
  }, []);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onPick = useCallback(async (next: File | null) => {
    abortRef.current?.abort();
    setClips((prev) => {
      for (const clip of prev) URL.revokeObjectURL((clip as ClipResult & { url?: string }).url ?? "");
      return [];
    });
    setError(null);
    setProbeError(null);
    setFile(next);
    setInfo(null);
    setDuration(0);
    setCurrent(0);
    setStart(0);
    setEnd(0);
    setMarkers([]);
    setPlaying(false);
    if (!next) return;
    try {
      const probed = await probeFile(next);
      setInfo(probed);
      if (probed.duration > 0) {
        setDuration(probed.duration);
        setEnd(probed.duration);
      }
    } catch (err) {
      setProbeError(explainError(err));
    }
  }, []);

  const onLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
      setEnd((prev) => (prev > 0 ? Math.min(prev, video.duration) : video.duration));
    }
  };

  const seekTo = (time: number) => {
    const video = videoRef.current;
    const t = clamp(time, 0, duration || 0);
    setCurrent(t);
    if (video) video.currentTime = t;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const planned = useMemo((): SplitRange[] => {
    if (duration <= 0) return [];
    if (mode === "range") return [{ start, end: Math.max(end, start + 0.2) }];
    if (mode === "parts") return rangesForParts(duration, parts);
    if (mode === "interval") return rangesForInterval(duration, interval);
    return rangesForMarkers(duration, markers);
  }, [duration, end, interval, markers, mode, parts, start]);

  const runSplit = async () => {
    if (!file || planned.length === 0) return;
    setError(null);
    setBusy(true);
    setProgress({ clipIndex: 0, clipCount: planned.length, fraction: 0 });
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const results = await splitRanges(
        file,
        planned,
        transcode && canH264,
        setProgress,
        controller.signal,
      );
      setClips(results);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Split cancelled.");
      } else {
        setError(explainError(err));
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const addMarker = () => {
    const t = current;
    setMarkers((prev) => {
      if (prev.some((m) => Math.abs(m - t) < 0.15)) return prev;
      return [...prev, t].sort((a, b) => a - b);
    });
  };

  const saveClip = async (clip: ClipResult) => {
    const f = new File([clip.blob], clip.name, { type: "video/mp4" });
    const shared = await shareFiles([f], clip.name);
    if (!shared) downloadBlob(clip.blob, clip.name);
  };

  const saveAll = async () => {
    if (clips.length === 0) return;
    const files = clips.map(
      (c) => new File([c.blob], c.name, { type: "video/mp4" }),
    );
    const shared = await shareFiles(files, "SplitVideo clips");
    if (shared) return;
    if (clips.length === 1) {
      downloadBlob(clips[0]!.blob, clips[0]!.name);
      return;
    }
    const zip = await zipBlobs(clips);
    downloadBlob(zip, "splitvideo-clips.zip");
  };

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grain" aria-hidden="true" />
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="font-display text-base font-semibold tracking-tight">SplitVideo</p>
            <p className="text-xs text-muted">splitvideo.in</p>
          </div>
        </div>
        <Badge variant="ok" className="gap-1">
          <ShieldCheck className="size-3.5" />
          On device
        </Badge>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-4">
        {!file ? (
          <DropZone
            onOpen={() => inputRef.current?.click()}
            onFile={(f) => void onPick(f)}
          />
        ) : (
          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="glass overflow-hidden rounded-3xl p-3">
              <div className="relative overflow-hidden rounded-xl bg-black">
                {objectUrl ? (
                  <video
                    ref={videoRef}
                    src={objectUrl}
                    className="aspect-video max-h-[52dvh] w-full bg-black object-contain"
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={onLoadedMetadata}
                    onLoadedData={() => {
                      const v = videoRef.current;
                      if (v && v.currentTime < 0.05) v.currentTime = 0.08;
                    }}
                    onTimeUpdate={() => {
                      const v = videoRef.current;
                      if (v) setCurrent(v.currentTime);
                    }}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                  />
                ) : null}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-md"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4 translate-x-px" />
                  )}
                </button>
              </div>
              <div className="px-1 pt-4">
                <Timeline
                  duration={duration}
                  current={current}
                  start={start}
                  end={end}
                  markers={markers}
                  showRange={mode === "range"}
                  showMarkers={mode === "markers"}
                  disabled={busy || duration <= 0}
                  onSeek={seekTo}
                  onRange={(s, e) => {
                    setStart(s);
                    setEnd(e);
                  }}
                />
              </div>
            </div>

            <div className="glass flex flex-col gap-4 rounded-3xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {formatTime(duration)}
                    {info?.width && info.height ? ` · ${info.width}×${info.height}` : ""}
                    {info?.videoCodec ? ` · ${info.videoCodec.toUpperCase()}` : ""}
                    {` · ${formatBytes(file.size)}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove video"
                  onClick={() => void onPick(null)}
                  disabled={busy}
                >
                  <X className="size-4" />
                </Button>
              </div>

              {file.size > WARN_BYTES ? (
                <p className="text-xs text-destructive">
                  This file is large. Older phones may run out of memory. Split a shorter range if it fails.
                </p>
              ) : null}
              {probeError ? <p className="text-xs text-destructive">{probeError}</p> : null}

              <div className="grid grid-cols-2 gap-2">
                {MODES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMode(item.id)}
                    className={cn(
                      "h-11 rounded-md text-sm font-medium transition-colors duration-150",
                      mode === item.id
                        ? "bg-primary text-primary-foreground"
                        : "glass-btn text-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {mode === "range" ? (
                <p className="text-sm text-muted">
                  Drag the handles. This exports one clip from {formatTime(start)} to {formatTime(end)}.
                </p>
              ) : null}

              {mode === "parts" ? (
                <Field
                  label="Number of parts"
                  value={parts}
                  min={2}
                  max={MAX_CLIPS}
                  onChange={setParts}
                />
              ) : null}

              {mode === "interval" ? (
                <Field
                  label="Seconds per clip"
                  value={interval}
                  min={1}
                  max={Math.max(1, Math.floor(duration) || 60)}
                  onChange={setIntervalSec}
                />
              ) : null}

              {mode === "markers" ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="glass" className="flex-1" onClick={addMarker} disabled={busy}>
                      <Plus className="size-4" />
                      Cut at {formatTime(current)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Clear cuts"
                      onClick={() => setMarkers([])}
                      disabled={busy || markers.length === 0}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted">
                    {markers.length === 0
                      ? "Add at least one cut point to split the video into pieces."
                      : `${markers.length} cut${markers.length === 1 ? "" : "s"} · ${planned.length} clips`}
                  </p>
                </div>
              ) : null}

              <Separator />

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-primary"
                  checked={transcode && canH264}
                  disabled={!canH264 || busy}
                  onChange={(e) => setTranscode(e.target.checked)}
                />
                <span>
                  <span className="font-medium">H.264 for every phone</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {canH264
                      ? "Re-encodes so clips play on more devices. Slower, uses more battery, slight quality loss."
                      : "This browser cannot re-encode. Clips keep the original codec (fast, no quality loss)."}
                  </span>
                </span>
              </label>

              <p className="text-sm text-muted">
                {planned.length === 1
                  ? `Ready to export 1 clip (${formatTime(planned[0] ? planned[0].end - planned[0].start : 0)}).`
                  : `Ready to export ${planned.length} clips.`}
              </p>

              {busy ? (
                <div className="space-y-2">
                  <Progress value={Math.round(progress.fraction * 100)} />
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs tabular-nums text-muted">
                      Clip {Math.min(progress.clipIndex + 1, progress.clipCount)} of {progress.clipCount}
                      {` · ${Math.round(progress.fraction * 100)}%`}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => abortRef.current?.abort()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button className="w-full" size="lg" onClick={() => void runSplit()} disabled={planned.length === 0}>
                  <Scissors className="size-4" />
                  Split video
                </Button>
              )}

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>
          </section>
        )}

        {clips.length > 0 ? (
          <section className="glass rounded-3xl p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Clips</h2>
                <p className="text-xs text-muted">
                  On iPhone, Share saves to Photos or Files. Nothing was uploaded.
                </p>
              </div>
              <Button variant="glass" onClick={() => void saveAll()}>
                <Share2 className="size-4" />
                Save all
              </Button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {clips.map((clip) => (
                <ClipCard key={clip.name} clip={clip} onSave={() => void saveClip(clip)} />
              ))}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-3 sm:grid-cols-3">
          <Fact title="Stays on the phone" body="The file never leaves this device. There is no server encode, so there is no per-minute cost." />
          <Fact title="Lossless by default" body="Original picture is copied. Cuts follow keyframes, so the start can land up to about a second early." />
          <Fact title="iOS and Android" body="Uses the Files / Photos picker. Save with the system share sheet. Works in Safari and Chrome." />
        </section>
      </main>

      <input
        ref={inputRef}
        type="file"
        accept="video/*,.mp4,.mov,.m4v,.webm,.mkv"
        className="sr-only"
        onChange={(e) => void onPick(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function Logo() {
  return (
    <span className="glass-btn flex size-11 items-center justify-center rounded-md" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-5 text-foreground">
        <rect x="3" y="5" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="14" y="5" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.55" />
        <path d="M11.2 3.5 12.8 20.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

function DropZone({
  onOpen,
  onFile,
}: {
  onOpen: () => void;
  onFile: (file: File) => void;
}) {
  const [over, setOver] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const next = e.dataTransfer.files[0];
        if (next) onFile(next);
      }}
      className={cn(
        "glass flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-3xl px-6 py-12 text-center transition-[box-shadow,background-color] duration-200",
        over && "bg-foreground/10",
      )}
    >
      <span className="glass-btn flex size-16 items-center justify-center rounded-xl">
        <FolderOpen className="size-7" />
      </span>
      <div className="max-w-md space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Split a video on this phone
        </h1>
        <p className="text-muted">
          Drop a file here, or tap to choose from Photos or Files. Processing stays on-device — it is not uploaded.
        </p>
      </div>
      <span className="inline-flex h-12 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground">
        Choose video
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min, min, max))}
      />
    </div>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <article className="glass rounded-2xl p-4">
      <h2 className="font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </article>
  );
}

function ClipCard({ clip, onSave }: { clip: ClipResult; onSave: () => void }) {
  const url = useMemo(() => URL.createObjectURL(clip.blob), [clip.blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  return (
    <li className="overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-border">
      <video src={url} className="aspect-video w-full bg-black object-contain" playsInline preload="metadata" controls />
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{clip.name}</p>
          <p className="text-xs tabular-nums text-muted">
            {formatTime(clip.duration)} · {formatBytes(clip.blob.size)}
          </p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" aria-label={`Share ${clip.name}`} onClick={onSave}>
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Download ${clip.name}`}
            onClick={() => downloadBlob(clip.blob, clip.name)}
          >
            <Download className="size-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}


