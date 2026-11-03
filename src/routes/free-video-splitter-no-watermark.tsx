import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";
export const Route = createFileRoute("/free-video-splitter-no-watermark")({
  head: () => ({
    meta: [
      { title: "Video Splitter Without Watermarks | SplitVideo" },
      {
        name: "description",
        content:
          "SplitVideo is moving to paid access. Sign in with Google and purchase access to split videos on your device without watermarks.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/free-video-splitter-no-watermark" },
    ],
  }),
  component: () => (
    <SeoPageLayout title="Video splitting without watermarks">
      <p>
        SplitVideo is moving to a paid-only tool. Older links may describe a free version; the new
        version requires Google sign-in and a one-time purchase.
      </p>
      <p>
        Your videos are processed on your device. Exported clips have no added watermark. Device
        memory, storage, browser support, and the limit of 24 clips per run still apply.
      </p>
      <p>
        <Link to="/account" className="text-accent underline">
          View account and access options
        </Link>
      </p>
    </SeoPageLayout>
  ),
});
