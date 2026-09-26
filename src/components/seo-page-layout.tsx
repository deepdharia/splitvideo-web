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
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>
            © {new Date().getFullYear()} SplitVideo.in ·{" "}
            <a href="mailto:build@splitvideo.in" className="hover:text-foreground">
              build@splitvideo.in
            </a>
          </p>
            <a
              href="https://www.linkedin.com/company/splitvideo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit shrink-0 items-center gap-1.5 self-start rounded-md border border-border/60 bg-foreground/5 px-2 py-0.5 text-xs font-medium text-muted transition-colors hover:border-border hover:bg-foreground/10 hover:text-foreground"
              aria-label="SplitVideo on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          <nav aria-label="Footer links" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/" className="hover:text-foreground">
              Tool
            </Link>
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
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
