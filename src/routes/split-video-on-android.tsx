import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-video-on-android")({
  head: () => ({
    meta: [
      { title: "Split Video on Android — Free Browser Tool | SplitVideo.in" },
      { name: "description", content: "Split videos on Android in Chrome or another modern browser. Choose equal parts or time clips, process on the device, and save with the system share options. No upload." },
      { property: "og:title", content: "Split Video on Android | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/split-video-on-android" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-video-on-android" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video on Android">
      <p className="text-foreground">SplitVideo works on Android in modern browsers such as Chrome. You select a video, choose how to divide it, and export the clips. Processing runs on the device.</p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Direct answer</h2>
        <p className="mt-2">Open <Link to="/" className="font-medium text-accent hover:underline">splitvideo.in</Link> in Chrome → pick a video → select a split mode → press Split video → save or share the clips.</p>
      </div>
      <h2 className="text-xl font-semibold text-foreground">Steps on Android</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open your browser and go to www.splitvideo.in.</li>
        <li>Tap to choose a video from the gallery or file picker.</li>
        <li>Select Equal parts, Every N sec, Range, or Cut points.</li>
        <li>Tap Split video and save the clips.</li>
      </ol>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Open the tool on Android</Link></p>
    </SeoPageLayout>
  );
}
