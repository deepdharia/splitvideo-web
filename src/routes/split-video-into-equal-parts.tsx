import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-video-into-equal-parts")({
  head: () => ({
    meta: [
      { title: "Split Video into Equal Parts Online — Free Tool | SplitVideo.in" },
      { name: "description", content: "Split a long video into equal parts in your browser. Choose 2, 3, 4 or more equal clips. No upload. Ideal for gaming sessions and multi-part uploads." },
      { property: "og:title", content: "Split Video into Equal Parts Online | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/split-video-into-equal-parts" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-video-into-equal-parts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video into equal parts">
      <p className="text-foreground">When you need a long recording broken into the same number of balanced clips — for example three equal parts of a gameplay session — SplitVideo’s Equal parts mode does exactly that.</p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Direct answer</h2>
        <p className="mt-2">Open <Link to="/" className="font-medium text-accent hover:underline">SplitVideo</Link>, pick your file, select <strong>Equal parts</strong>, enter the number of clips, and press Split video. Each clip receives a similar share of the total length. Processing stays on your device.</p>
      </div>
      <h2 className="text-xl font-semibold text-foreground">When equal parts are useful</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Turning a long gaming recording into a set number of Shorts or Reels-ready clips.</li>
        <li>Creating consistent chapter-length segments for a multi-part upload.</li>
        <li>Dividing a screen recording into balanced pieces for review or sharing.</li>
      </ul>
      <h2 className="text-xl font-semibold text-foreground">Steps</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open the tool and choose your video.</li>
        <li>Select <strong>Equal parts</strong>.</li>
        <li>Set the number of parts.</li>
        <li>Press Split video and save the clips.</li>
      </ol>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Split into equal parts now</Link></p>
    </SeoPageLayout>
  );
}
