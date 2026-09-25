import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-mp4-video")({
  head: () => ({
    meta: [
      { title: "Split MP4 Video Online Free — On-Device Tool | SplitVideo.in" },
      { name: "description", content: "Split MP4 videos into equal parts, time clips, or custom segments in your browser. No upload, no watermark. Works with common MP4 files on phone and desktop." },
      { property: "og:title", content: "Split MP4 Video Online Free | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/split-mp4-video" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-mp4-video" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split MP4 video online">
      <p className="text-foreground">MP4 is the most common container for phone recordings and exported gameplay. SplitVideo can load an MP4 and split it into equal parts, fixed-time clips, a range, or custom cut points — all inside the browser.</p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Answer first</h2>
        <p className="mt-2">Open <Link to="/" className="font-medium text-accent hover:underline">SplitVideo.in</Link>, choose your .mp4 file, select the split mode, and export. The file stays on your device.</p>
      </div>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Split an MP4 now</Link></p>
    </SeoPageLayout>
  );
}
