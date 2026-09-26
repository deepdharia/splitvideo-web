import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        title:
          "Split Video Online Free | SplitVideo — On-Device Video Splitter",
      },
      {
        name: "description",
        content:
          "SplitVideo is a free online video splitter. Split any video into equal parts or by time in your browser. No upload, no watermark. Works on iPhone, Android, and desktop.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#08090d" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "SplitVideo" },
      { name: "author", content: "SplitVideo.in" },
      { name: "application-name", content: "SplitVideo" },
      {
        name: "keywords",
        content:
          "split video, video splitter, split video online, split video into equal parts, split video by time, free video splitter, on device video splitter, split MP4, split video iPhone, split video Android",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/" },
      // SplitVideo brand mark — same icon on every page
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#08090d" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8886727331242294"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
        <Analytics />
      </body>
    </html>
  ),
});
