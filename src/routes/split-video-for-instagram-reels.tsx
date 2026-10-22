import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What size should Instagram Reels clips be?",
    a: "Reels are 1080×1920 (9:16), up to 3 minutes. SplitVideo keeps your recording's original frame — it splits the timeline without cropping. Vertical recordings export Reel-ready; for horizontal footage, split into clips here, then crop to 9:16 in your editor.",
  },
  {
    q: "How do I split a video into parts for Instagram Reels?",
    a: "Open SplitVideo, drop in your video, and use Every N sec with a 15s, 30s, or 60s interval — or place custom cut points for highlights. Split once, download all clips as a ZIP, and post them as a Reels series.",
  },
  {
    q: "Will Instagram compress my clips?",
    a: "Instagram re-compresses uploads, so starting from the highest quality helps. SplitVideo's default mode copies the original video stream without re-encoding, so your clips keep the exact source quality.",
  },
];

export const Route = createFileRoute("/split-video-for-instagram-reels")({
  head: () => ({
    meta: [
      {
        title:
          "Split Video for Instagram Reels — Free Clip Maker | SplitVideo",
      },
      {
        name: "description",
        content:
          "Split videos into Instagram Reels-length clips free. Every N sec intervals, custom cut points, batch ZIP download, up to 24 clips per run. No watermark, no upload — 100% on-device.",
      },
      {
        property: "og:title",
        content: "Split Video for Instagram Reels | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Turn long videos into Reel-length clips. Free, no watermark, on-device.",
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
                "Turn a long recording into multiple Instagram Reels-length clips with SplitVideo's free on-device splitter.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Add your video to SplitVideo",
                  text: "Drop an MP4, MOV, WebM, or MKV into the splitter. It loads in your browser — nothing is uploaded.",
                },
                {
                  "@type": "HowToStep",
                  name: "Slice it into Reel lengths",
                  text: "Use Every N sec with a 15s, 30s, or 60s interval, or drop custom cut points on the timeline for highlights.",
                },
                {
                  "@type": "HowToStep",
                  name: "Check the frame",
                  text: "SplitVideo keeps your recording's original frame. Vertical recordings are Reel-ready as exported; crop horizontal clips to 9:16 in your editor after splitting.",
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
        <Link to="/" className="text-accent hover:underline">
          video splitter
        </Link>{" "}
        cuts your long video into Reels-length clips — free, watermark-free,
        and processed on your device.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Built for the Reels workflow
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Reel-length intervals:</strong>{" "}
          Every N sec at 15s, 30s, 60s, or 90s — one run, a full batch of
          clips.
        </li>
        <li>
          <strong className="text-foreground">Original frame kept:</strong>{" "}
          no forced crop or stretch — vertical recordings post as-is, and
          horizontal clips crop cleanly in your editor.
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
        30-second clips. Post the strongest moment first, then release
        the rest as a series with "part 2" hooks. Because every clip is
        watermark-free and full-quality, they look native, not recycled.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        A worked example: a 10-minute vlog
      </h2>
      <p>
        Ten minutes at a 30-second interval is twenty clips — inside the
        24-per-run limit, so it is a single split and one ZIP download. In
        practice you will not post all twenty. Watch the batch once, keep
        the six with a real moment in them, and let the rest go. That
        ratio — record long, split everything, publish the best third — is
        how a single weekly recording session turns into a daily posting
        habit without daily recording. Longer source? A 40-minute video
        needs two runs of twenty minutes each; the{" "}
        <Link to="/how-to-split-a-video" className="text-accent hover:underline">
          how-to guide
        </Link>{" "}
        covers the range trick for that.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Two details that decide how a Reel lands
      </h2>
      <p>
        <strong className="text-foreground">The first frame is the cover.</strong>{" "}
        Instagram picks your opening frame as the thumbnail in the grid, so
        a clip that starts mid-blink or mid-pan starts at a disadvantage.
        Cut points placed a breath before the moment beat interval
        boundaries here.{" "}
        <strong className="text-foreground">Audio travels with the clip.</strong>{" "}
        Your recording's original sound is copied into every part unchanged.
        If you plan to use a trending track, add it inside Instagram when
        posting — keep your split's audio as-is and let the app layer the
        music, so the same clip can be reposted later with a different
        track.
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
          Open the video splitter
        </Link>
      </p>
    </SeoPageLayout>
  );
}
