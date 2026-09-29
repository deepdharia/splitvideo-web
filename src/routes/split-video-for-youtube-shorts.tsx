import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What length should YouTube Shorts clips be?",
    a: "YouTube Shorts can be up to 3 minutes long, but clips between 15 and 60 seconds tend to hold attention best. The Shorts Studio has one-tap 15s, 30s, 60s, and 90s presets so you can slice a long video to the right length instantly.",
  },
  {
    q: "What video size do YouTube Shorts need?",
    a: "Shorts are vertical: 1080×1920 pixels (9:16 aspect ratio). If your recording is horizontal, use the studio's 9:16 Crop for full-screen vertical or 9:16 Blur BG for the blurred-fill style — both re-encode to true 1080×1920.",
  },
  {
    q: "Can I split a long video into multiple Shorts at once?",
    a: "Yes. Drop in a long recording, choose the Every X sec mode with a 30s or 60s preset, and the studio renders every clip in one batch. Download them individually or as a single ZIP.",
  },
];

export const Route = createFileRoute("/split-video-for-youtube-shorts")({
  head: () => ({
    meta: [
      {
        title:
          "Split Video for YouTube Shorts — Free 9:16 Clip Maker | SplitVideo",
      },
      {
        name: "description",
        content:
          "Turn long videos into YouTube Shorts free. One-tap 15/30/60/90s presets, true 9:16 vertical re-encode, no watermark, no upload. Split a recording into ready-to-post Shorts in your browser.",
      },
      {
        property: "og:title",
        content: "Split Video for YouTube Shorts | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Long video in, vertical Shorts out. Free 9:16 clip maker — no watermark, on-device.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/split-video-for-youtube-shorts",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      {
        property: "og:image",
        content: "https://www.splitvideo.in/og.jpg",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.splitvideo.in/split-video-for-youtube-shorts",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HowTo",
              name: "How to split a video into YouTube Shorts",
              description:
                "Turn a long horizontal or vertical recording into multiple 9:16 YouTube Shorts clips using SplitVideo's free Shorts Studio.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Open the Shorts Studio and add your video",
                  text: "Drop an MP4, MOV, WebM, or MKV file into the studio. It opens in your browser with no upload.",
                },
                {
                  "@type": "HowToStep",
                  name: "Choose a Shorts-friendly length",
                  text: "Tap a 15s, 30s, 60s, or 90s preset in Every X sec mode, or place custom cut points on the timeline.",
                },
                {
                  "@type": "HowToStep",
                  name: "Pick the 9:16 vertical format",
                  text: "Choose 9:16 Crop for full-screen vertical or 9:16 Blur BG for the blurred-fill look. Clips re-encode to 1080×1920.",
                },
                {
                  "@type": "HowToStep",
                  name: "Split and download",
                  text: "Render all clips in one batch and download them individually or as a ZIP — watermark-free and ready to upload as Shorts.",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Split Video for YouTube Shorts">
      <p className="text-foreground">
        The fastest way to turn one long recording into a week of YouTube
        Shorts: SplitVideo's{" "}
        <Link to="/studio" className="text-accent hover:underline">
          Shorts Studio
        </Link>{" "}
        slices your video into vertical 9:16 clips at Shorts-friendly lengths —
        free, no watermark, and everything happens on your device.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Why creators use it for Shorts
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">One-tap presets:</strong> 15s,
          30s, 60s, and 90s — the lengths that work best as Shorts.
        </li>
        <li>
          <strong className="text-foreground">True 9:16 output:</strong>{" "}
          hardware-accelerated re-encode to 1080×1920, not a stretched fake.
        </li>
        <li>
          <strong className="text-foreground">Batch everything:</strong> a
          10-minute recording becomes twenty 30-second Shorts in one run, with
          a single ZIP download.
        </li>
        <li>
          <strong className="text-foreground">Gameplay-ready:</strong> built for
          long gaming sessions — split a 2-hour stream into Shorts while you
          make chai.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">
        Horizontal recording? Two good options
      </h2>
      <p>
        <strong className="text-foreground">9:16 Crop</strong> zooms into the
        center of the frame — best when the action stays middle-screen (talking
        head, centered gameplay).{" "}
        <strong className="text-foreground">9:16 Blur BG</strong> keeps the full
        horizontal frame visible and fills the top and bottom with a blurred
        copy — best for wide gameplay or screen recordings where cropping would
        cut off UI.
      </p>

      <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
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
          to="/studio"
          className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Make Shorts from your video — free
        </Link>
      </p>
    </SeoPageLayout>
  );
}
