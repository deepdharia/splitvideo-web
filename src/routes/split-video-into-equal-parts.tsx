import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated into /how-to-split-a-video on 2026-10-23 — this route permanently redirects there.
export const Route = createFileRoute("/split-video-into-equal-parts")({
  beforeLoad: () => {
    throw redirect({ to: "/how-to-split-a-video", statusCode: 301 });
  },
});
