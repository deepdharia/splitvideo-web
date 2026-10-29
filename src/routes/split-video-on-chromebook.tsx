import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const title = "Split Video on Chromebook — Free Splitter | SplitVideo";
const description =
  "Split video on Chromebook with a free browser-based video splitter. Create equal parts or timed clips locally, without uploading your recording.";
const url = "https://www.splitvideo.in/split-video-on-chromebook";
const FAQ = [
  {
    q: "Do I need an Android or Linux video editor?",
    a: "No. This workflow runs in the browser without a separate Android or Linux editing application.",
  },
  {
    q: "Can I split MP4 files on Chromebook?",
    a: "MP4 is a supported input container, but a particular recording also needs compatible video and audio codecs and MP4 export support. The extension alone does not guarantee that the file will work.",
  },
  {
    q: "Is video processing local?",
    a: "Yes. SplitVideo reads the selected recording and creates clips locally in your browser instead of uploading the recording for server-side encoding.",
  },
  {
    q: "Where can I find my saved clips?",
    a: "Open Chrome’s download list to see the saved files and their locations. With the default download location, check Downloads in the Files app. If Save all downloads a ZIP, extract it to access the individual clips.",
  },
];

export const Route = createFileRoute("/split-video-on-chromebook")({
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
    <SeoPageLayout title="Split video on Chromebook">
      <p className="text-foreground">
        Turn a presentation, lesson recording, or screen capture into smaller clips in your
        Chromebook’s browser. SplitVideo is a free video splitter that processes the selected
        recording locally, without uploading it for server-side encoding or adding a watermark. You
        do not need to install Android or Linux editing software for this workflow.
      </p>
      <p>
        <Link to="/" className="text-accent hover:underline">
          Open the free video splitter
        </Link>
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Start with a local copy from Google Drive
      </h2>
      <p>
        Download the complete recording from Google Drive or another cloud service before selecting
        it. A file listed in Drive is not necessarily stored on your Chromebook. Find the downloaded
        copy in the Files app and check free storage: you need space for the source recording and
        the exported clips.
      </p>
      <h2 className="text-xl font-semibold text-foreground">How to split a video on Chromebook</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Download the recording to your Chromebook, then open SplitVideo in Chrome.</li>
        <li>Click Choose video and select the local recording.</li>
        <li>Choose Equal parts, Every N sec, Cut points, or Range.</li>
        <li>Adjust the number of parts, interval, cut points, or section and click Split video.</li>
        <li>Use Download on each finished clip or Save all for the set.</li>
        <li>
          Open Chrome’s download list to locate the results. Organize them in the Files app and
          extract a ZIP if you downloaded one.
        </li>
      </ol>
      <h2 className="text-xl font-semibold text-foreground">Choose equal parts or timed clips</h2>
      <p>
        A 10-minute presentation divided with Equal parts and Number of parts set to 5 requests five
        approximately two-minute sections. For regular intervals, choose Every N sec and enter 60 to
        request roughly one-minute clips. If the recording does not divide evenly, the final clip
        can be shorter. Each run exports at most 24 clips, so use larger intervals or process
        sections separately for longer recordings.
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Separate topics instead of equal durations
      </h2>
      <p>
        Choose Cut points for an uneven lesson or presentation, placing cuts where one topic ends
        and the next begins. Range is useful when you only need one passage. Default lossless cuts
        follow keyframes and can extend outside the requested times; do not rely on exactly timed
        clips for a strict duration limit.
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Split video files with limited memory
      </h2>
      <p>
        Lower-memory Chromebooks may struggle with long or high-resolution recordings because
        exported clips are held in memory. Close unnecessary tabs and applications, free space for
        downloads, and keep the Chromebook awake during processing. Start with a short Range to
        check the file before attempting a longer export. There is no guaranteed file size every
        Chromebook can handle.
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
          Split your video on Chromebook
        </Link>
      </p>
    </SeoPageLayout>
  );
}
