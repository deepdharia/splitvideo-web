import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const SITE_URL = "https://splitvideo.in";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "SplitVideo — Free Online Video Splitter" },
      {
        name: "description",
        content:
          "Split videos into clips, equal parts, time intervals, or custom cut points in your browser. Processing stays on your device — your video is not uploaded.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SplitVideo — Free Online Video Splitter" },
      {
        property: "og:description",
        content:
          "Split videos into clips, equal parts, time intervals, or custom cut points. Your video stays on your device.",
      },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "SplitVideo — Free Online Video Splitter" },
      {
        name: "twitter:description",
        content:
          "Split videos in your browser with on-device processing. No upload required.",
      },
      { name: "theme-color", content: "#08090d" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
