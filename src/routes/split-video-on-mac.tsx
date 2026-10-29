import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const title = "Split Video on Mac & MacBook — Free | SplitVideo";
const description =
  "Split video on Mac or MacBook in your browser. Use a free video splitter to create equal parts or custom clips, with no upload or watermark.";
const url = "https://www.splitvideo.in/split-video-on-mac";
const FAQ = [
  {
    q: "Can I split a video on Mac without installing an app?",
    a: "Yes. You can use the browser tool without installing a separate desktop video editor. A particular recording still needs compatible codecs and sufficient device resources.",
  },
  {
    q: "Is SplitVideo free on MacBook?",
    a: "Yes. The browser-based splitter is free to use and does not add a watermark to exported clips.",
  },
  {
    q: "Will splitting reduce video quality?",
    a: "When the default export copies the original streams, it avoids re-encoding quality loss. Copying is preferred rather than guaranteed for every input. The optional H.264 for every phone setting re-encodes when available and can introduce quality loss.",
  },
  {
    q: "Does splitting delete my original recording?",
    a: "No. The tool reads the selected file and creates separate output clips. Keep your original until you have saved and checked the results.",
  },
];

export const Route = createFileRoute("/split-video-on-mac")({
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
    <SeoPageLayout title="Split video on Mac or MacBook">
      <p className="text-foreground">
        Separate a screen recording, tutorial, or gameplay session into useful clips on your MacBook
        or desktop Mac. SplitVideo reads the selected file locally and processes it in your browser,
        without uploading your recording for server-side encoding. Choose a local file, set the
        sections you need, and save the results without installing a separate editor.
      </p>
      <p>
        <Link to="/" className="text-accent hover:underline">
          Open the free video splitter
        </Link>
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Prepare recordings from Photos or iCloud
      </h2>
      <p>
        If the recording lives in Photos, export a copy to a folder such as Movies or Downloads
        before opening the file picker. For iCloud Drive, make sure the complete recording has
        downloaded to your Mac: an entry visible in Finder can still be cloud-only. Keep the source
        copy until you have checked the exported clips.
      </p>
      <h2 className="text-xl font-semibold text-foreground">How to split a video on MacBook</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Open SplitVideo in your browser and click Choose video.</li>
        <li>Select the local recording from your Mac.</li>
        <li>Choose Equal parts, Every N sec, Cut points, or Range.</li>
        <li>
          Set Number of parts, the interval, your cut points, or the start and end times, then click
          Split video.
        </li>
        <li>
          Use Download for individual clips or Save all for the set. Open the browser’s download
          list and reveal the saved file in Finder. Extract a ZIP before opening its clips.
        </li>
      </ol>
      <h2 className="text-xl font-semibold text-foreground">
        Divide a tutorial into useful sections
      </h2>
      <p>
        For a 12-minute tutorial, choose Equal parts and set Number of parts to 4 to request four
        approximately three-minute sections. If lessons end at uneven times, choose Cut points
        instead and add the topic boundaries. Every N sec creates regular intervals, while Range
        exports just one selected passage. You can export at most 24 clips in one run; the final
        interval may be shorter.
      </p>
      <h2 className="text-xl font-semibold text-foreground">MP4, MOV, and lossless cuts</h2>
      <p>
        MP4 and MOV recordings can be read by the tool, but not every codec or track can be
        processed or written to MP4. Browser support and the formats inside the container matter
        more than the extension alone. Outputs are MP4 clips. The default path prefers copying
        streams without re-encoding when possible. Lossless cuts expand to keyframe boundaries and
        may begin earlier or end later than requested, so they are not frame-accurate.
      </p>
      <h2 className="text-xl font-semibold text-foreground">
        Leave memory and storage for long recordings
      </h2>
      <p>
        Long or high-resolution screen recordings need memory for the exported clips as well as free
        disk space to save them. Close unnecessary tabs and applications, keep your Mac awake, and
        try a short Range before committing to a large job. Splitting makes new files rather than
        shrinking the source; keep enough space for both.
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
          Split your video on Mac
        </Link>
      </p>
    </SeoPageLayout>
  );
}
