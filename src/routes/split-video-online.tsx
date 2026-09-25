import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/split-video-online")({
  head: () => ({
    meta: [
      { title: "Split Video Online Free — On-Device Browser Tool | SplitVideo.in" },
      {
        name: "description",
        content:
          "Split video online without uploading. Free browser tool that cuts long recordings into equal parts, time clips, or custom segments on your device. Works on phone and desktop.",
      },
      { property: "og:title", content: "Split Video Online Free — On-Device | SplitVideo.in" },
      {
        property: "og:description",
        content:
          "Split video online in your browser. No upload, no watermark. Equal parts, time intervals, or custom cuts. Built for creators and gamers.",
      },
      { property: "og:url", content: "https://www.splitvideo.in/split-video-online" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/split-video-online" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video online — free, on your device">
      <p className="text-foreground">
        SplitVideo lets you split a video online without sending the file to a
        remote server. Open the page in a modern browser, choose the video from
        your device, pick how you want it divided, and export the clips. Processing
        stays local.
      </p>
      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Quick answer</h2>
        <p className="mt-2">
          To split a video online with SplitVideo: go to{" "}
          <Link to="/" className="font-medium text-accent hover:underline">
            splitvideo.in
          </Link>
          , select your file, choose Equal parts, Every N sec, Range, or Cut
          points, then export. The original video never leaves your phone or
          computer.
        </p>
      </div>
      <h2 className="text-xl font-semibold text-foreground">How to split a video online</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open SplitVideo.in in Chrome, Safari, Firefox, or Edge.</li>
        <li>Tap or click to choose a video (or drag and drop on desktop).</li>
        <li>Select a mode: Equal parts, Every N sec, Range, or Cut points.</li>
        <li>Review the planned clips and press Split video.</li>
        <li>Save or share the resulting clips with the system share sheet or download.</li>
      </ol>
      <h2 className="text-xl font-semibold text-foreground">Why on-device splitting matters</h2>
      <p>
        Many online video splitters require an upload. That means waiting for the
        transfer, possible size limits, and the original file leaving your device.
        SplitVideo avoids that path: the browser reads the file locally and
        produces the clips on the same device. This is especially useful for
        longer gameplay recordings, personal footage, or any file you prefer not
        to upload.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Supported formats and devices</h2>
      <p>
        The tool works with common formats your browser can play, including MP4
        and MOV. It runs on modern iPhone (Safari), Android (Chrome and others),
        and desktop browsers. Very large files depend on available memory; if a
        file is too big, try a shorter range first.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Related guides</h2>
      <ul className="space-y-2">
        <li><Link to="/split-video-into-equal-parts" className="text-accent hover:underline">Split video into equal parts</Link></li>
        <li><Link to="/split-video-by-time" className="text-accent hover:underline">Split video by time</Link></li>
        <li><Link to="/split-mp4-video" className="text-accent hover:underline">Split MP4 video</Link></li>
        <li><Link to="/split-video-on-iphone" className="text-accent hover:underline">Split video on iPhone</Link></li>
        <li><Link to="/split-video-on-android" className="text-accent hover:underline">Split video on Android</Link></li>
      </ul>
      <p className="pt-2">
        <Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
          Open the free video splitter
        </Link>
      </p>
    </SeoPageLayout>
  );
}
