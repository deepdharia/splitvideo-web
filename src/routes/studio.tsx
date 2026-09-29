import { createFileRoute, Link } from "@tanstack/react-router";
import { StudioApp } from "@/components/studio-app";

const FAQ = [
  {
    q: "How do I convert a horizontal video to vertical 9:16?",
    a: "Open the Shorts Studio, drop in your video, and choose the 9:16 Crop or 9:16 Blur BG format. The studio re-encodes each clip to 1080×1920 vertical using your device's hardware encoder, so a landscape recording becomes a full-screen vertical clip ready for Shorts, Reels, or TikTok.",
  },
  {
    q: "How do I split a video for YouTube Shorts?",
    a: "Use the Every X sec mode and tap a 15s, 30s, or 60s preset — YouTube Shorts can be up to 3 minutes, but 15–60 seconds performs best. Pick the 9:16 format, split, and download the clips individually or as a ZIP.",
  },
  {
    q: "Will my clips have a watermark?",
    a: "No. Every clip exported from the Shorts Studio is watermark-free, in both the lossless Original mode and the re-encoded 9:16 / 1:1 formats.",
  },
  {
    q: "Is my video uploaded to a server?",
    a: "No. Like the main SplitVideo tool, the Shorts Studio processes everything in your browser on your device. The original file is never uploaded.",
  },
  {
    q: "What's the difference between Original and 9:16 modes?",
    a: "Original mode copies the video stream without re-encoding — it's lossless and instant, and cuts snap to the nearest keyframe. The 9:16 and 1:1 modes re-encode with H.264 (Low / Medium / High quality) so you get exact cut points and a true vertical frame.",
  },
];

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      {
        title:
          "Shorts Studio — Make Vertical 9:16 Clips for Shorts, Reels & TikTok | SplitVideo",
      },
      {
        name: "description",
        content:
          "Free Shorts Studio by SplitVideo: turn any long video into vertical 9:16 clips for YouTube Shorts, Instagram Reels & TikTok. One-tap 15/30/60/90s presets, lossless or re-encoded, no watermark, no upload — 100% on-device.",
      },
      {
        property: "og:title",
        content: "Shorts Studio — Free Vertical Video Maker | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Turn long videos into 9:16 clips for Shorts, Reels & TikTok. Free, no watermark, files never leave your device.",
      },
      { property: "og:url", content: "https://www.splitvideo.in/studio" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Shorts Studio — Free Vertical Video Maker | SplitVideo",
      },
      {
        name: "twitter:description",
        content:
          "Long video in, vertical 9:16 clips out. Free, no watermark, on-device.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/studio" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "SplitVideo Shorts Studio",
              url: "https://www.splitvideo.in/studio",
              description:
                "Free browser-based studio that turns long videos into vertical 9:16 clips for YouTube Shorts, Instagram Reels, and TikTok. One-tap duration presets, lossless or hardware-accelerated re-encode, no watermark, on-device processing.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any (modern browser)",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "One-tap 15/30/60/90 second Shorts presets",
                "9:16 vertical crop and blur-background formats",
                "1:1 square format for feed posts",
                "Lossless stream-copy splitting",
                "Custom cut points on a visual timeline",
                "Batch ZIP download",
                "No watermark, no upload",
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
  component: Studio,
});

function Studio() {
  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          SplitVideo Shorts Studio
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Turn any video into vertical 9:16 clips for Shorts, Reels & TikTok
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
          Drop in a long recording and get phone-ready vertical clips in
          seconds. One-tap 15/30/60/90-second presets, exact cut points on a
          visual timeline, and a real 1080×1920 vertical re-encode — free, no
          watermark, and your file never leaves your device.
        </p>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-white">
          <StudioApp />
        </div>
      </div>

      <section
        aria-labelledby="studio-how"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <h2
            id="studio-how"
            className="text-2xl font-semibold sm:text-3xl"
          >
            How to make vertical clips from a horizontal video
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-muted sm:text-base">
            <li>
              <strong className="text-foreground">1. Drop in your video.</strong>{" "}
              MP4, MOV, WebM, or MKV — it opens instantly in your browser. No
              upload, no account.
            </li>
            <li>
              <strong className="text-foreground">
                2. Choose clip length and format.
              </strong>{" "}
              Tap a 15s / 30s / 60s / 90s preset, place custom cut points, or set
              a time range. Pick <em>9:16 Crop</em> for full-screen vertical or{" "}
              <em>9:16 Blur BG</em> for the blurred-fill look.
            </li>
            <li>
              <strong className="text-foreground">
                3. Split and download.
              </strong>{" "}
              Clips render one by one with live progress. Download individually
              or grab everything as a ZIP — watermark-free and ready to post.
            </li>
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="studio-faq"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <h2
            id="studio-faq"
            className="text-2xl font-semibold sm:text-3xl"
          >
            Shorts Studio FAQ
          </h2>
          <div className="mt-4 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-foreground">{f.q}</h3>
                <p className="mt-1 text-sm leading-6 text-muted sm:text-base">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Need plain splits instead? Use the{" "}
            <Link to="/" className="font-medium text-accent hover:underline">
              free online video splitter
            </Link>{" "}
            for equal parts, time-based clips, and custom cut points — or read
            the{" "}
            <Link
              to="/video-splitter-faq"
              className="font-medium text-accent hover:underline"
            >
              video splitter FAQ
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
