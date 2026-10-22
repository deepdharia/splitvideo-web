import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "Is my video uploaded when I use SplitVideo?",
    a: "No — not partially, not temporarily. The file is opened by your browser and processed on your device; there is no server that receives it. You can verify this yourself: load the page, switch your phone to airplane mode, and split a video. It still works, because the work never needed a connection.",
  },
  {
    q: "Is SplitVideo really free? What is the catch?",
    a: "It is free, with no account and no watermark. The honest limits are physical, not commercial: up to 24 clips per run, and file size bounded by your device's memory. There is no server bill behind the tool, so there is nothing to recover from you.",
  },
  {
    q: "How do I split a video into equal parts?",
    a: "Choose Equal parts, enter how many clips you want, and press Split video. A 60-minute recording in 6 parts gives six 10-minute clips. The how-to guide works through each mode with examples.",
  },
  {
    q: "How do I split a video by time — every 30 or 60 seconds?",
    a: "Choose Every N sec and enter the interval. The video is cut at that length from the start, and the final clip holds the remainder, so it is usually shorter. A 90-second interval is the standard choice for WhatsApp Status.",
  },
  {
    q: "How many clips can I create at once?",
    a: "Up to 24 per run. That covers most jobs — 24 parts at 90 seconds is 36 minutes of video. For a longer series, split the recording into two ranges and run each range separately; the clips stay in order.",
  },
  {
    q: "Does splitting reduce video quality?",
    a: "Not in the default mode. SplitVideo copies the original video and audio streams into each clip without re-encoding, so a clip is the same picture data as the source. The optional H.264 mode re-encodes for wider device compatibility — slightly slower, and quality can change a little.",
  },
  {
    q: "Why does a clip sometimes start a fraction of a second off from my cut?",
    a: "Because of keyframes. Video streams store complete frames every second or so, and a lossless cut can only begin at one of those frames, so the boundary snaps to the nearest keyframe — up to about a second. When a cut must be exact, re-export that clip with the H.264 option, which re-encodes and lands precisely.",
  },
  {
    q: "Which video formats does SplitVideo work with?",
    a: "Any format your browser can play: MP4, MOV, and WebM cover most phone and camera recordings. Two known edges — HEVC recordings from iPhones may not open in desktop Chrome or Firefox (use Safari), and MKV is not supported by browsers. If a file will not load, the troubleshooting page lists the options.",
  },
  {
    q: "How large a file can I split?",
    a: "There is no size limit set by the tool, because nothing is uploaded. The practical limit is your device's memory and free storage: phones handle a few gigabytes comfortably, and a 15.09 GB recording has been split in a desktop browser. The large files guide documents that job and the strategy behind it.",
  },
  {
    q: "Does SplitVideo work on iPhone?",
    a: "Yes, in Safari. Pick the video from Photos or Files, split it, and save clips with the share sheet. The phone guide covers iPhone specifics, including the iCloud download step that trips people up and Safari's memory behaviour on very large files.",
  },
  {
    q: "Does SplitVideo work on Android?",
    a: "Yes, in Chrome or Samsung Internet. Clips download to your Downloads folder or go out through the share sheet. The phone guide covers Android specifics, including why links opened inside other apps' browsers can misbehave.",
  },
  {
    q: "Where do my clips download to, and what if the ZIP fails?",
    a: "On desktop, clips land in your browser's downloads folder; on phones, use the share sheet or check Downloads. If a large ZIP fails, free some storage — the clips together are roughly the size of the original — or download the clips individually instead.",
  },
];

export const Route = createFileRoute("/video-splitter-faq")({
  head: () => ({
    meta: [
      { title: "Video Splitter FAQ — Full Answers about SplitVideo.in" },
      {
        name: "description",
        content:
          "Complete answers about SplitVideo: uploads and privacy, the 24-clip limit, lossless quality, keyframe cuts, supported formats, very large files, iPhone and Android.",
      },
      { property: "og:title", content: "Video Splitter FAQ | SplitVideo.in" },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/video-splitter-faq",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/video-splitter-faq" },
    ],
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
    <SeoPageLayout title="Video splitter FAQ">
      <p className="text-foreground">
        The complete answers about how SplitVideo works — privacy, limits,
        quality, formats, and phones. The homepage carries the short version;
        this page is the full one, and the guides go deeper still:{" "}
        <Link to="/how-to-split-a-video" className="text-accent hover:underline">
          how to split a video
        </Link>
        ,{" "}
        <Link to="/split-video-on-phone" className="text-accent hover:underline">
          splitting on your phone
        </Link>
        ,{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large files
        </Link>
        , and{" "}
        <Link to="/video-splitter-troubleshooting" className="text-accent hover:underline">
          troubleshooting
        </Link>
        .
      </p>
      <div className="space-y-6">
        {FAQ.map((f) => (
          <article key={f.q} className="glass rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-foreground">{f.q}</h2>
            <p className="mt-2">{f.a}</p>
          </article>
        ))}
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">
            Still have a question?
          </h2>
          <p className="mt-2">
            Email{" "}
            <a
              href="mailto:build@splitvideo.in"
              className="text-accent hover:underline"
            >
              build@splitvideo.in
            </a>{" "}
            — include your device, browser, and the video's format and size
            if it is about a specific file.
          </p>
        </article>
      </div>
      <p className="pt-4">
        <Link
          to="/"
          className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Go to the video splitter
        </Link>
      </p>
    </SeoPageLayout>
  );
}
