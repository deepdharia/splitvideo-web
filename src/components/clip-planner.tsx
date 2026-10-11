import { useId, useState } from "react";

/** A planning aid only; exported boundaries depend on the source keyframes. */
export function ClipPlanner() {
  const id = useId();
  const [duration, setDuration] = useState("137");
  const [interval, setInterval] = useState("30");
  const total = Number(duration);
  const step = Number(interval);
  const valid = duration.trim() !== "" && interval.trim() !== "" && Number.isFinite(total) && Number.isFinite(step) && total > 0 && step >= 1 && total <= 86400;
  const count = valid ? Math.ceil(total / step) : 0;
  const last = valid ? total - (count - 1) * step : 0;
  const format = (n: number) => `${Number(n.toFixed(2))}s`;
  return (
    <section className="glass rounded-2xl p-5" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="text-lg font-semibold text-foreground">Clip planner</h3>
      <p className="mt-2 text-sm">Calculate requested clip lengths without selecting a video.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label htmlFor={`${id}-duration`} className="space-y-2">Video duration (seconds)
          <input id={`${id}-duration`} type="number" min="0.01" max="86400" step="any" inputMode="decimal" value={duration} onChange={e => setDuration(e.target.value)} className="block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" />
        </label>
        <label htmlFor={`${id}-interval`} className="space-y-2">Seconds per clip
          <input id={`${id}-interval`} type="number" min="1" step="any" inputMode="decimal" value={interval} onChange={e => setInterval(e.target.value)} className="block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" />
        </label>
      </div>
      <div className="mt-4" role="status" aria-live="polite">
        {valid ? <><p className="font-semibold text-foreground">{count} {count === 1 ? "clip" : "clips"} · final clip {format(last)}</p><p className="mt-1 text-sm">{count > 1 ? `${count - 1} clips of ${format(step)}, then ${format(last)}.` : `One clip containing the full ${format(total)} recording.`}</p></> : <p>Enter a duration above zero (up to 86,400 seconds) and an interval of at least 1 second.</p>}
      </div>
      <p className="mt-3 text-xs">Planning estimate, not an export guarantee. Lossless cuts may begin at earlier keyframes.</p>
    </section>
  );
}
