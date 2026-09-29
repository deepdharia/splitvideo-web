import { useEffect, useRef } from "react";
import { initClipSplitStudio } from "@/lib/clipsplit/engine";
import { TOOL_HTML } from "@/lib/clipsplit/template";
import "@/lib/clipsplit/styles.css";

/**
 * Shorts Studio — the ClipSplit engine mounted inside splitvideo.in.
 * The tool markup is injected once; all behaviour is scoped to this root.
 */
export function StudioApp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = TOOL_HTML;
    const cleanup = initClipSplitStudio(el);
    return () => {
      cleanup();
      el.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className="cs-scope" />;
}
