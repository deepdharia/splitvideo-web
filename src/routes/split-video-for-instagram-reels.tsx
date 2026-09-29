import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What size should Instagram Reels clips be?",
    a: "Reels are 1080×1920 (9:16). Recordings up to 3 minutes are supported. The Shorts Studio re-encodes your clips to true 1080×1920 with 9:16 Crop or 9:16 Blur BG, so horizontal footage becomes Reel-ready.",
  },
  {
    q: "How do I split a video into parts for Instagram Reels?",
    a: "Open the Shorts Studio, drop in your video, and use the Every X sec mode with a 15s, 30s, or 60s preset — or place custom cut points for highlights. Split once, download all clips as a ZIP, and upload them as a Reels series.",
  },
  {
    q: "Will Instagram compress my clips?",
    a: "Instagram always re-compresses uploads, so starting from the highest quality helps. Use the High quality setting in the studio's 9:16 mode to give Instagram the cleanest possible source file.",
  },
];

export const Route = createFileRoute("/split-video-for-instagram-reels")({
  head: () => ({
    meta: [
      {
        title:
          "Split Video for Instagram Reels — Free 9:16 Reel Maker | SplitVideo",
      },
      {
        name: "description",
        content:
          "Split videos into Instagram Reels free. True 9:16 vertical re-encode, 15/30/60/90s presets, custom cut points, batch ZIP download. No watermark, no upload — 100% on-device.",
      },
      {
        property: "og:title",
        content: "Split Video for Instagram Reels | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Turn long videos into Reel-ready 9:16 clips. Free, no watermark, on-device.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/split-video-for-instagram-reels",
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
        href: "https://www.splitvideo.in/split-video-for-instagram-reels",
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
              name: "How to split a video into Instagram Reels",
              description:
                "Turn a long recording into multiple 9:16 Instagram Reels clips with SplitVideo's free Shorts Studio.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Add your video to the Shorts Studio",
                  text: "Drop an MP4, MOV, WebM, or MKV into the studio. It loads in your browser — nothing is uploaded.",
                },
                {
                  "@type": "HowToStep",
                  name: "Slice it into Reel lengths",
                  text: "Use Every X sec with 15s/30s/60s presets, or drop custom cut points on the timeline for highlights.",
                },
                {
                  "@type": "HowToStep",
                  name: "Go vertical 9:16",
                  text: "Pick 9:16 Crop or 9:16 Blur BG. Clips render at 1080×1920 — the exact Reels size.",
                },
                {
                  "@type": "HowToStep",
                  name: "Download and post",
                  text: "Grab clips individually or as a ZIP, then upload them to Instagram as Reels. No watermark on any export.",
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
    <SeoPageLayout title="Split Video for Instagram Reels">
      <p className="text-foreground">
        One recording, a week of Reels. SplitVideo's{" "}
        <Link to="/studio" className="text-accent hover:underline">
          Shorts Studio
        </Link>{" "}
        cuts your long video into vertical 9:16 clips sized exactly for
        Instagram Reels — free, watermark-free, and processed on your device.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Built for the Reels workflow
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Reel-length presets:</strong>{" "}
          15s, 30s, 60s, 90s — tap once, get a full batch of clips.
        </li>
        <li>
          <strong className="text-foreground">Exact 9:16 output:</strong>{" "}
          1080×1920 H.264, the native Reels format. No black bars, no stretch.
        </li>
        <li>
          <strong className="text-foreground">Highlight cuts:</strong> drop
          markers on the timeline to pull the best moments out of a long
          recording.
        </li>
        <li>
          <strong className="text-foreground">Series-ready:</strong> download
          everything as one ZIP and drip-feed Reels across the week.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">
        A practical Reels routine
      </h2>
      <p>
        Record once — a vlog, a gameplay session, a tutorial. Split it into
        30-second vertical clips. Post the strongest moment first, then release
        the rest as a series with "part 2" hooks. Because every clip is
        watermark-free and full-quality, they look native, not recycled.
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
          Make Reels from your video — free
        </Link>
      </p>
    </SeoPageLayout>
  );
}
