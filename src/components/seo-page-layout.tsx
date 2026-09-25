import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SeoPageLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grain" aria-hidden="true" />
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link to="/" className="flex items-center gap-3">
          <span
            className="glass-btn flex size-11 items-center justify-center rounded-md"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="size-5 text-foreground">
              <rect x="3" y="5" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.9" />
              <rect x="14" y="5" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.55" />
              <path d="M11.2 3.5 12.8 20.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <div>
            <p className="font-display text-base font-semibold tracking-tight">SplitVideo</p>
            <p className="text-xs text-muted">splitvideo.in</p>
          </div>
        </Link>
        <Link
          to="/"
          className="glass-btn rounded-md px-3 py-2 text-sm font-medium"
        >
          Open tool
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        {title ? (
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
        ) : null}
        <div className="mt-6 space-y-6 text-sm leading-7 text-muted sm:text-base">
          {children}
        </div>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SplitVideo.in ·{" "}
            <a href="mailto:build@splitvideo.in" className="hover:text-foreground">
              build@splitvideo.in
            </a>
          </p>
          <nav aria-label="Footer links" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/" className="hover:text-foreground">
              Tool
            </Link>
            <Link to="/split-video-online" className="hover:text-foreground">
              Split online
            </Link>
            <Link to="/split-video-into-equal-parts" className="hover:text-foreground">
              Equal parts
            </Link>
            <Link to="/video-splitter-faq" className="hover:text-foreground">
              FAQ
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
