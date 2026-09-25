import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-video-on-iphone")({
  head: () => ({
    meta: [
      { title: "Split Video on iPhone — Free Browser Tool | SplitVideo.in" },
      { name: "description", content: "Split videos on iPhone without an app. Use Safari, pick from Photos or Files, choose equal parts or time clips, and save with the share sheet. No upload." },
      { property: "og:title", content: "Split Video on iPhone | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/split-video-on-iphone" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-video-on-iphone" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video on iPhone">
      <p className="text-foreground">You can split a video on iPhone without installing a separate app. SplitVideo runs in Safari, reads the file from Photos or Files, and lets you export equal parts, time-based clips, a range, or custom cut points.</p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Short answer</h2>
        <p className="mt-2">Open <Link to="/" className="font-medium text-accent hover:underline">splitvideo.in</Link> in Safari → choose a video → pick a split mode → press Split video → use the share sheet to save. Nothing is uploaded.</p>
      </div>
      <h2 className="text-xl font-semibold text-foreground">Steps on iPhone</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open Safari and go to www.splitvideo.in.</li>
        <li>Tap to select a video from Photos or Files.</li>
        <li>Choose Equal parts, Every N sec, Range, or Cut points.</li>
        <li>Tap Split video.</li>
        <li>Use the share sheet to save the clips.</li>
      </ol>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Open SplitVideo on this phone</Link></p>
    </SeoPageLayout>
  );
}
