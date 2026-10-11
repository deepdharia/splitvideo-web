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
        <li>Dividing a gaming recording into a set number of sections for later editing.</li>
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
      <h2 className="text-xl font-semibold text-foreground">Example: divide 10 minutes into four parts</h2>
      <p>Ten minutes is 600 seconds. Dividing by four gives a target length of 150 seconds per part: 0:00–2:30, 2:30–5:00, 5:00–7:30, and 7:30–10:00. These are requested boundaries. Lossless exports can begin at an earlier keyframe, so inspect the actual clips if exact timing matters.</p>
      <h2 className="text-xl font-semibold text-foreground">Equal duration does not mean equal file size</h2>
      <p>A busy action sequence can require more data than a still scene of the same length. Variable bitrate recordings therefore produce different-sized files even when the durations match. If you are trying to meet an attachment size limit, check each exported file. Choosing four parts does not guarantee that each file is exactly a quarter of the source size.</p>
      <h2 className="text-xl font-semibold text-foreground">When to choose another mode</h2>
      <p>Equal parts can cut in the middle of a word, demonstration, or game encounter. Choose custom cut points if each section needs a complete idea. Choose <Link to="/split-video-by-time" className="text-accent hover:underline">Every N sec</Link> if you have a desired clip length; its planner shows the number of clips and the final remainder.</p>
      <h2 className="text-xl font-semibold text-foreground">A practical review workflow</h2>
      <ol className="list-decimal space-y-2 pl-5"><li>Watch the source and decide whether balanced lengths fit the recording.</li><li>Export a small number of parts first. Many tiny clips make saving and checking harder.</li><li>Play the beginning and end of each clip. Check speech, audio sync, and repeated frames around a cut.</li><li>Save the files in order and retain the source until every output has been checked.</li></ol>
      <p>Splitting does not automatically create captions, choose highlights, or change the aspect ratio. For vertical framing, open <Link to="/studio" className="text-accent hover:underline">Shorts Studio</Link> and review the crop separately.</p>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Split into equal parts now</Link></p>
    </SeoPageLayout>
  );
}
