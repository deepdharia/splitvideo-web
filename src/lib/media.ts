import { stem } from "@/lib/time";

export const MAX_CLIPS = 24;
export const WARN_BYTES = 400 * 1024 * 1024;

export type SplitRange = { start: number; end: number };

export type MediaInfo = {
  duration: number;
  width: number | null;
  height: number | null;
  videoCodec: string | null;
  audioCodec: string | null;
};

export type ClipResult = {
  name: string;
  blob: Blob;
  duration: number;
  start: number;
  end: number;
};

export type SplitProgress = {
  clipIndex: number;
  clipCount: number;
  fraction: number;
};

type Mb = typeof import("mediabunny");

let mbPromise: Promise<Mb> | null = null;

function loadMb() {
  mbPromise ??= import("mediabunny");
  return mbPromise;
}

export async function canTranscodeH264(): Promise<boolean> {
  try {
    const mb = await loadMb();
    return await mb.canEncodeVideo("avc");
  } catch {
    return false;
  }
}

export function rangesForParts(duration: number, parts: number): SplitRange[] {
  const n = Math.min(MAX_CLIPS, Math.max(2, Math.floor(parts)));
  const slice = duration / n;
  return Array.from({ length: n }, (_, i) => ({
    start: i * slice,
    end: i === n - 1 ? duration : (i + 1) * slice,
  }));
}

export function rangesForInterval(duration: number, interval: number): SplitRange[] {
  const step = Math.max(1, interval);
  const ranges: SplitRange[] = [];
  for (let t = 0; t < duration - 0.04; t += step) {
    if (ranges.length >= MAX_CLIPS) break;
    ranges.push({ start: t, end: Math.min(duration, t + step) });
  }
  return ranges;
}

export function rangesForMarkers(duration: number, markers: number[]): SplitRange[] {
  const cuts = [0, ...markers.filter((m) => m > 0.05 && m < duration - 0.05), duration]
    .sort((a, b) => a - b)
    .filter((v, i, arr) => i === 0 || v - (arr[i - 1] ?? 0) > 0.05);
  const ranges: SplitRange[] = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    if (ranges.length >= MAX_CLIPS) break;
    ranges.push({ start: cuts[i]!, end: cuts[i + 1]! });
  }
  return ranges;
}

export async function probeFile(file: File): Promise<MediaInfo> {
  const mb = await loadMb();
  const input = new mb.Input({
    source: new mb.BlobSource(file),
    formats: mb.ALL_FORMATS,
  });
  try {
    const readable = await input.canRead();
    if (!readable) {
      throw new Error("This file is not a supported video. Use MP4, MOV, M4V, WebM, or MKV.");
    }
    const fromMeta = await input.getDurationFromMetadata();
    const duration =
      fromMeta && fromMeta > 0.05 ? fromMeta : await input.computeDuration();
    const video = await input.getPrimaryVideoTrack();
    const audio = await input.getPrimaryAudioTrack();
    return {
      duration,
      width: video ? await video.getDisplayWidth() : null,
      height: video ? await video.getDisplayHeight() : null,
      videoCodec: video?.codec ?? null,
      audioCodec: audio?.codec ?? null,
    };
  } finally {
    input.dispose();
  }
}

export function explainError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/memory|allocation|oom|array buffer/i.test(msg)) {
    return "This device ran out of memory. Try a shorter section or a smaller file.";
  }
  if (/codec|unsupported|not supported|cannot/i.test(msg)) {
    return "This codec could not be exported. Turn on H.264 compatibility, or pick another file.";
  }
  if (/empty file|empty/i.test(msg)) {
    return "Export produced an empty clip. Move the range slightly and try again.";
  }
  return msg || "Split failed. Try another file or a shorter range.";
}

async function cutOnce(
  mb: Mb,
  file: File,
  range: SplitRange,
  transcode: boolean,
  onProgress: (fraction: number) => void,
  signal: AbortSignal,
): Promise<Blob> {
  const input = new mb.Input({
    source: new mb.BlobSource(file),
    formats: mb.ALL_FORMATS,
  });
  const target = new mb.BufferTarget();
  const output = new mb.Output({
    format: new mb.Mp4OutputFormat({ fastStart: "in-memory" }),
    target,
  });

  const conversion = await mb.Conversion.init({
    input,
    output,
    tracks: "primary",
    trim: { start: range.start, end: range.end },
    copy: transcode
      ? false
      : { mode: "preferred", boundaryPolicy: "expand" },
    video: transcode ? { codec: "avc", quality: mb.QUALITY_HIGH } : undefined,
    audio: transcode ? { codec: "aac", quality: mb.QUALITY_HIGH } : undefined,
    showWarnings: false,
  });

  if (!conversion.isValid) {
    const why =
      conversion.discardedTracks
        .map((d) => d.reason.replaceAll("_", " "))
        .join(", ") || "no usable tracks";
    input.dispose();
    throw new Error(`Could not write this clip (${why}).`);
  }

  const onAbort = () => {
    void conversion.cancel();
  };
  signal.addEventListener("abort", onAbort);

  conversion.onProgress = (progress) => {
    onProgress(progress);
  };

  try {
    await conversion.execute();
  } finally {
    signal.removeEventListener("abort", onAbort);
    input.dispose();
  }

  if (signal.aborted) {
    throw new DOMException("Cancelled", "AbortError");
  }

  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 32) {
    throw new Error("Export produced an empty file.");
  }
  return new Blob([buffer], { type: "video/mp4" });
}

export async function splitRanges(
  file: File,
  ranges: SplitRange[],
  transcode: boolean,
  onProgress: (p: SplitProgress) => void,
  signal: AbortSignal,
): Promise<ClipResult[]> {
  if (ranges.length === 0) throw new Error("Nothing to split — adjust the range.");
  if (ranges.length > MAX_CLIPS) {
    throw new Error(`Too many clips. This tool exports at most ${MAX_CLIPS} at a time.`);
  }

  const mb = await loadMb();
  const results: ClipResult[] = [];
  const base = stem(file.name);

  for (let i = 0; i < ranges.length; i++) {
    if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
    const range = ranges[i]!;
    const blob = await cutOnce(
      mb,
      file,
      range,
      transcode,
      (fraction) => {
        onProgress({
          clipIndex: i,
          clipCount: ranges.length,
          fraction: (i + fraction) / ranges.length,
        });
      },
      signal,
    );
    results.push({
      name: `${base}_${String(i + 1).padStart(2, "0")}.mp4`,
      blob,
      duration: Math.max(0, range.end - range.start),
      start: range.start,
      end: range.end,
    });
    onProgress({
      clipIndex: i,
      clipCount: ranges.length,
      fraction: (i + 1) / ranges.length,
    });
  }

  return results;
}
