import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipPlanner } from "@/components/clip-planner";
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
      <h2 className="text-xl font-semibold text-foreground">Plan the clips before choosing a file</h2>
      <p>A time interval sets the requested length of each clip, not the number of clips. Divide the source duration by the interval and round up. The final clip contains whatever remains; it is not padded or stretched.</p>
      <ClipPlanner />
      <h2 className="text-xl font-semibold text-foreground">Worked example: a 2 minute 17 second recording</h2>
      <p>At 30 seconds per clip, the requested ranges are 0–30, 30–60, 60–90, 90–120, and 120–137 seconds. That is four 30-second clips and a final 17-second clip. Check that the last clip contains the ending before deleting or moving your original.</p>
      <h2 className="text-xl font-semibold text-foreground">Why an exported cut can start early</h2>
      <p>The default lossless path copies compressed video rather than creating every frame again. A playable section needs a keyframe: a frame that can be decoded without earlier pictures. A requested cut between keyframes may therefore begin earlier than planned. The offset depends on the recording, so a calculated interval is not a guarantee of an exact exported duration.</p>
      <p>If your destination has a strict duration limit, inspect the exported file before uploading. Where supported, the H.264 option re-encodes the video; this takes more processing and may change quality. Test one short section before exporting a long recording.</p>
      <h2 className="text-xl font-semibold text-foreground">Choose the right splitting mode</h2>
      <p>Use time intervals for a sequence of short clips. Use <Link to="/split-video-into-equal-parts" className="text-accent hover:underline">Equal parts</Link> when you need a fixed number of sections. Use custom cuts around scene changes or sentence endings when the story matters more than uniform length. Splitting alone does not crop a landscape recording into a vertical frame.</p>
      <h2 className="text-xl font-semibold text-foreground">Before saving a batch</h2>
      <ul className="list-disc space-y-2 pl-5"><li>Keep the tab open and the device awake while processing.</li><li>Play the first and last exports, including their audio.</li><li>Keep sequential filenames so the clips remain in order.</li><li>If processing stops, try a shorter source and consult the <Link to="/video-splitter-faq" className="text-accent hover:underline">troubleshooting answers</Link>.</li></ul>
      <p className="pt-2"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Split by time now</Link></p>
    </SeoPageLayout>
  );
}
