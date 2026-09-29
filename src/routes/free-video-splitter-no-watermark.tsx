import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "Is SplitVideo really free with no watermark?",
    a: "Yes. Every clip you export — in the main splitter and in the Shorts Studio — downloads without any watermark, logo, or branding burned into the video. There are no export limits forcing an upgrade.",
  },
  {
    q: "Do I need to create an account to remove the watermark?",
    a: "No. There is no account, no sign-up, and no 'free trial' that adds a watermark later. The tool runs entirely in your browser.",
  },
  {
    q: "Why do other free video splitters add watermarks?",
    a: "Most free online tools process your video on their servers, which costs them money — the watermark (or a paid plan to remove it) is how they pay for it. SplitVideo processes everything on your device, so there is no server cost to recover.",
  },
  {
    q: "Will the clips keep their original quality?",
    a: "Yes, by default. The lossless mode copies the original video stream without re-encoding, so quality is identical to the source. If you choose a 9:16 or 1:1 format in the Shorts Studio, the video is re-encoded with H.264 at your chosen quality level.",
  },
];

export const Route = createFileRoute("/free-video-splitter-no-watermark")({
  head: () => ({
    meta: [
      {
        title:
          "Free Video Splitter — No Watermark, No Sign-Up | SplitVideo",
      },
      {
        name: "description",
        content:
          "Split videos online free with no watermark. Equal parts, time-based clips, custom cut points, and a vertical Shorts Studio — all on-device, no upload, no account needed.",
      },
      {
        property: "og:title",
        content: "Free Video Splitter — No Watermark | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Split any video into clips online. Free forever, no watermark, no sign-up. Files never leave your device.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/free-video-splitter-no-watermark",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      {
        property: "og:image",
        content: "https://www.splitvideo.in/og.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.splitvideo.in/free-video-splitter-no-watermark",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "SplitVideo — Free Video Splitter, No Watermark",
              url: "https://www.splitvideo.in/free-video-splitter-no-watermark",
              description:
                "Free online video splitter with no watermark. Split videos into equal parts, by time, or at custom cut points. Optional Shorts Studio for vertical 9:16 clips. On-device processing, no upload, no account.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any (modern browser)",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
    <SeoPageLayout title="Free Video Splitter — No Watermark, No Sign-Up">
      <p className="text-foreground">
        SplitVideo is a free online video splitter that never adds a watermark
        to your clips. No account, no trial expiry, no logo burned into the
        corner — just clean exports, straight from your browser.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        What you can do, free
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Split into equal parts</strong> —
          divide a long recording into 2, 4, 10, or up to 24 equal clips.
        </li>
        <li>
          <strong className="text-foreground">Split by time</strong> — create a
          clip every 15, 30, or 60 seconds automatically.
        </li>
        <li>
          <strong className="text-foreground">Custom cut points</strong> — drop
          markers on a visual timeline for exact highlights.
        </li>
        <li>
          <strong className="text-foreground">Shorts Studio</strong> — turn
          landscape footage into vertical 9:16 clips for Shorts, Reels, and
          TikTok with one-tap presets.
        </li>
        <li>
          <strong className="text-foreground">Batch ZIP download</strong> — grab
          all clips in one file.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">
        Why there's no watermark
      </h2>
      <p>
        Most "free" video tools run your file through their servers. Servers
        cost money, so those tools either stamp a watermark on free exports or
        push you toward a paid plan. SplitVideo takes a different approach:
        your video is processed entirely on your own device, in your browser.
        With no server bill to pay, there's nothing to upsell — so exports stay
        clean and free.
      </p>
      <p>
        The trade-off is honest: very large files are limited by your device's
        own memory rather than an artificial paywall, and the optional 9:16 /
        1:1 re-encodes take a little time because your phone or laptop is doing
        the rendering work locally.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        How to split a video without a watermark
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open the{" "}
          <Link to="/" className="text-accent hover:underline">
            free video splitter
          </Link>{" "}
          and choose your video from Photos or Files.
        </li>
        <li>
          Pick a mode: <em>Equal parts</em>, <em>Every N sec</em>,{" "}
          <em>Range</em>, or <em>Cut points</em>.
        </li>
        <li>
          Hit <em>Split</em> and download your clips — individually or as a
          ZIP. No watermark, no account.
        </li>
      </ol>
      <p>
        Making content for vertical platforms? The{" "}
        <Link to="/studio" className="text-accent hover:underline">
          Shorts Studio
        </Link>{" "}
        converts the same video into 9:16 clips with 15/30/60/90-second
        presets — also free, also watermark-free.
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
          to="/"
          className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Split a video now — free, no watermark
        </Link>
      </p>
    </SeoPageLayout>
  );
}
