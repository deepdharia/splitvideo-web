import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const title = "Split Video on PC — Free Video Splitter | SplitVideo";
const description =
  "Split video on your Windows PC with a free video splitter. Create equal parts or time-based clips in your browser, with no upload or watermark.";
const url = "https://www.splitvideo.in/split-video-on-pc";
const FAQ = [
  {
    q: "Is my recording uploaded when I split video online?",
    a: "No. The selected video is read and processed locally in your browser, rather than uploaded for server-side encoding.",
  },
  {
    q: "Do I need to install a desktop editor?",
    a: "No. This workflow uses the browser-based tool without installing a separate Windows video editor.",
  },
  {
    q: "Does the free video splitter add a watermark?",
    a: "No. The export pipeline does not add a watermark to your clips.",
  },
  {
    q: "Where are my clips saved on PC?",
    a: "Check your browser’s download list. Downloads is the usual folder, but your browser settings or a save dialog may select another location. Extract a downloaded ZIP to access its clips.",
  },
];

export const Route = createFileRoute("/split-video-on-pc")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "splitvideo:page-metadata", content: "true" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://www.splitvideo.in/og.jpg" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split video on PC with a free video splitter">
      <p className="text-foreground">
        Turn a long Windows desktop or laptop recording into smaller clips without installing a
        desktop editor. SplitVideo processes the selected video locally in your browser; your
        recording is not uploaded to a video-processing server. Use it for gameplay sessions,
        meeting recordings, or sections of a tutorial.
      </p>
      <p>
        <Link to="/" className="text-accent hover:underline">
          Open the free video splitter
        </Link>
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        How to split a video on your computer
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open SplitVideo in your desktop browser.</li>
        <li>Click Choose video and select a local recording from your computer.</li>
        <li>Choose Equal parts, Every N sec, Cut points, or Range.</li>
        <li>
          Set the number of parts, interval, cut points, or start and end times. Click Split video.
        </li>
        <li>
          When processing finishes, use Download on each clip or Save all for the set. Check the
          browser’s download list to find the saved files.
        </li>
      </ol>
      <h2 className="text-xl font-semibold text-foreground">
        Choose the right video split for your recording
      </h2>
      <p>
        For a 20-minute recording, choose Equal parts and set Number of parts to 4. This requests
        four approximately five-minute clips. Use Every N sec for repeated intervals, Cut points to
        separate changes of topic, or Range to extract one passage. Lossless cuts follow keyframes,
        so boundaries can extend beyond the selected times and are not frame-accurate. Intervals can
        end with a shorter final clip; each run is limited to 24 clips.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Split MP4 recordings on Windows</h2>
      <p>
        To split MP4 recordings, start by selecting the original file rather than a cloud-storage
        shortcut. Download cloud-only recordings first. MP4 is a container: the video and audio
        codecs inside it, browser capabilities, and MP4 export compatibility all affect whether a
        recording can be processed. A filename ending in .mp4 does not guarantee success.
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Handle long gameplay and screen recordings
      </h2>
      <p>
        Close unnecessary tabs and applications, keep the laptop awake, and leave storage for both
        the source and exported clips. The tool holds output clips in memory, so a large recording
        can strain even a desktop browser. Try a shorter Range if the full recording fails, then
        continue with another section. Splitting creates additional files; it is not compression and
        does not automatically reduce total storage use.
      </p>
      <p>
        For settings and examples, read{" "}
        <Link to="/how-to-split-a-video" className="text-accent hover:underline">
          how to split a video
        </Link>
        . For longer jobs, see the{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large video files guide
        </Link>
        . If a recording fails to open or export, follow the{" "}
        <Link to="/video-splitter-troubleshooting" className="text-accent hover:underline">
          troubleshooting guide
        </Link>
        . Working on a mobile device instead? Use the{" "}
        <Link to="/split-video-on-phone" className="text-accent hover:underline">
          phone guide
        </Link>
        .
      </p>
      <p>
        Save all may open a system share dialog when supported. Otherwise it downloads a ZIP for
        multiple clips, or an MP4 for a single clip. Use each clip’s Download button when you want
        to save files individually.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Frequently asked questions</h2>
      <div className="space-y-4">
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold text-foreground">{f.q}</h3>
            <p className="mt-1">{f.a}</p>
          </div>
        ))}
      </div>
      <p className="pt-2">
        <Link
          to="/"
          className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Split your video on PC
        </Link>
      </p>
    </SeoPageLayout>
  );
}
