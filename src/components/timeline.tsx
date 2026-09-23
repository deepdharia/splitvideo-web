import { useCallback, useRef } from "react";
import { clamp, formatTime } from "@/lib/time";
import { cn } from "@/lib/utils";

type DragKind = "play" | "start" | "end" | null;

type TimelineProps = {
  duration: number;
  current: number;
  start: number;
  end: number;
  markers: number[];
  showRange: boolean;
  showMarkers: boolean;
  disabled?: boolean;
  onSeek: (time: number) => void;
  onRange: (start: number, end: number) => void;
};

export function Timeline({
  duration,
  current,
  start,
  end,
  markers,
  showRange,
  showMarkers,
  disabled,
  onSeek,
  onRange,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragKind>(null);

  const timeFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el || duration <= 0) return 0;
      const rect = el.getBoundingClientRect();
      const t = ((clientX - rect.left) / rect.width) * duration;
      return clamp(t, 0, duration);
    },
    [duration],
  );

  const apply = useCallback(
    (kind: DragKind, time: number) => {
      if (kind === "play") onSeek(time);
      if (kind === "start") {
        const next = Math.min(time, end - 0.2);
        onRange(clamp(next, 0, duration), end);
        onSeek(clamp(next, 0, duration));
      }
      if (kind === "end") {
        const next = Math.max(time, start + 0.2);
        onRange(start, clamp(next, 0, duration));
        onSeek(clamp(next, 0, duration));
      }
    },
    [duration, end, onRange, onSeek, start],
  );

  const onPointerDown = (kind: DragKind) => (event: React.PointerEvent) => {
    if (disabled) return;
    event.preventDefault();
    drag.current = kind;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    apply(kind, timeFromClientX(event.clientX));
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current) return;
    apply(drag.current, timeFromClientX(event.clientX));
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const pct = (t: number) => (duration > 0 ? (t / duration) * 100 : 0);
  const left = pct(start);
  const width = pct(end - start);
  const play = pct(current);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs tabular-nums text-muted">
        <span>{formatTime(showRange ? start : current)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div
        ref={trackRef}
        className={cn(
          "relative h-12 select-none touch-none",
          disabled && "pointer-events-none opacity-50",
        )}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          type="button"
          aria-label="Seek"
          className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-foreground/12"
          onPointerDown={onPointerDown("play")}
        />
        {showRange ? (
          <div
            className="timeline-fill pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-full"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        ) : null}
        {showMarkers
          ? markers.map((m) => (
              <span
                key={m}
                className="pointer-events-none absolute top-2 h-8 w-px bg-primary"
                style={{ left: `${pct(m)}%` }}
              />
            ))
          : null}
        <span
          className="pointer-events-none absolute top-1.5 h-9 w-px bg-foreground"
          style={{ left: `${play}%` }}
        />
        {showRange ? (
          <>
            <Handle
              ariaLabel="Range start"
              left={left}
              onPointerDown={onPointerDown("start")}
            />
            <Handle
              ariaLabel="Range end"
              left={left + width}
              onPointerDown={onPointerDown("end")}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

function Handle({
  left,
  ariaLabel,
  onPointerDown,
}: {
  left: number;
  ariaLabel: string;
  onPointerDown: (event: React.PointerEvent) => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="absolute top-1/2 z-10 size-11 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%` }}
      onPointerDown={onPointerDown}
    >
      <span className="mx-auto block size-4 rounded-full bg-primary shadow-sm" />
    </button>
  );
}
