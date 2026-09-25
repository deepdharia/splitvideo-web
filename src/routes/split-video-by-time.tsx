import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-video-by-time")({
  head: () => ({
    meta: [
      { title: "Split Video by Time / Every N Seconds — Free Tool | SplitVideo.in" },
      { name: "description", content: "Split a video by time interval (every N seconds) in your browser. Create fixed-length clips from long recordings without uploading. Free and private." },
      { property: "og:title", content: "Split Video by Time | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/split-video-by-time" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-video-by-time" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video by time (every N seconds)">
      <p className="text-foreground">Time-based splitting is ideal when each clip needs a consistent length — for example 15-second or 30-second segments for social platforms.</p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Quick answer</h2>
        <p className="mt-2">Open <Link to="/" className="font-medium text-accent hover:underline">the tool</Link>, choose your file, select <strong>Every N sec</strong>, enter the seconds per clip, and press Split video. Clips are created on your device.</p>
      </div>
      <h2 className="text-xl font-semibold text-foreground">Steps</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open SplitVideo and load your video.</li>
        <li>Select <strong>Every N sec</strong>.</li>
        <li>Enter the desired length in seconds.</li>
        <li>Run the split and save the clips.</li>
      </ol>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Split by time now</Link></p>
    </SeoPageLayout>
  );
}
