import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated into /split-video-on-phone on 2026-10-23 — this route permanently redirects there.
export const Route = createFileRoute("/split-video-on-iphone")({
  beforeLoad: () => {
    throw redirect({ to: "/split-video-on-phone", statusCode: 301 });
  },
});
