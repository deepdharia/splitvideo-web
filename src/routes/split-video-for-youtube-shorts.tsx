import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What length should YouTube Shorts clips be?",
    a: "YouTube Shorts can be up to 3 minutes long, but clips between 15 and 60 seconds tend to hold attention best. Use Every N sec in the splitter with a 15s, 30s, 60s, or 90s interval to slice a long video to the right length in one run.",
  },
  {
    q: "What video size do YouTube Shorts need?",
    a: "Shorts are vertical 1080×1920 (9:16). SplitVideo splits the timeline and keeps your recording's original frame — it does not crop horizontal footage to vertical. Record vertically and clips are Shorts-ready as exported; for horizontal recordings, split first, then crop to 9:16 in your editing app.",
  },
  {
    q: "Can I split a long video into multiple Shorts at once?",
    a: "Yes. Drop in a long recording, choose Every N sec with a 15s, 30s, or 60s interval, and SplitVideo creates every clip in one batch — up to 24 clips per run. Download them individually or as a single ZIP.",
  },
];

export const Route = createFileRoute("/split-video-for-youtube-shorts")({
  head: () => ({
    meta: [
      {
        title:
          "Split Video for YouTube Shorts — Free Clip Maker | SplitVideo",
      },
      {
        name: "description",
        content:
          "Turn a long recording into multiple YouTube Shorts-length clips with SplitVideo's free on-device splitter.",
      },
      {
        property: "og:title",
        content: "Split Video for YouTube Shorts | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Long video in, Shorts-length clips out. Free on-device splitter — no watermark, no upload.",
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
                "Turn a long recording into multiple YouTube Shorts-length clips using SplitVideo's free on-device splitter.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Open SplitVideo and add your video",
                  text: "Drop an MP4, MOV, WebM, or MKV file into the splitter. It opens in your browser with no upload.",
                },
                {
                  "@type": "HowToStep",
                  name: "Choose a Shorts-friendly length",
                  text: "Use Every N sec with a 15s, 30s, 60s, or 90s interval, or place custom cut points on the timeline.",
                },
                {
                  "@type": "HowToStep",
                  name: "Check your frame",
                  text: "SplitVideo keeps your recording's original frame and does not crop. Vertical recordings are Shorts-ready as exported; for horizontal recordings, crop the clips to 9:16 in your editing app after splitting.",
                },
                {
                  "@type": "HowToStep",
                  name: "Split and download",
                  text: "Split all clips in one batch and download them individually or as a ZIP — watermark-free and ready to upload as Shorts.",
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
        <Link to="/" className="text-accent hover:underline">
          video splitter
        </Link>{" "}
        slices your video into clips at Shorts-friendly lengths — free, no
        watermark, and everything happens on your device.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Why creators use it for Shorts
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Interval splitting:</strong>{" "}
          Every N sec at 15s, 30s, 60s, or 90s — the lengths that work best
          as Shorts.
        </li>
        <li>
          <strong className="text-foreground">Original frame kept:</strong>{" "}
          clips keep your recording's frame and source quality — vertical
          recordings are Shorts-ready as exported.
        </li>
        <li>
          <strong className="text-foreground">Batch everything:</strong> a
          10-minute recording becomes twenty 30-second clips in one run (up
          to 24 clips per run), with a single ZIP download.
        </li>
        <li>
          <strong className="text-foreground">Gameplay-ready:</strong> built for
          long gaming sessions — split a stream recording into Shorts in
          batches of up to 24 clips, range by range.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">
        From one recording to a week of Shorts
      </h2>
      <p>
        The workflow this tool was built for looks like this. A creator
        records one long session — say 34 minutes of gameplay. Split into
        equal parts, that is 24 clips of about 85 seconds; with cut points
        instead, it is however many real moments the session contained. Post
        the strongest clip today, and the batch carries the channel for days:
        one recording session, a week of uploads, no evening spent scrubbing
        a timeline in a heavy editor. The full real-world example — file
        size, specs, and screenshots — is written up in the{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large video files case study
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Intervals or cut points for Shorts?
      </h2>
      <p>
        Use <strong className="text-foreground">intervals</strong> when the
        recording is uniformly watchable — a steady tutorial, a vlog, a
        match played end to end. Use{" "}
        <strong className="text-foreground">cut points</strong> when the
        value is in moments: a Short lives or dies in its first two seconds,
        and an interval boundary does not know where your best moment starts.
        Many creators do both — cut points for the three or four real
        highlights, then an interval pass over the remainder for filler
        clips. Either way, each Short should contain one moment, not half of
        two. For the mechanics of each mode, see{" "}
        <Link to="/how-to-split-a-video" className="text-accent hover:underline">
          how to split a video
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Horizontal recording? Split first, then crop
      </h2>
      <p>
        SplitVideo splits the timeline and keeps your recording's original
        frame — it does not crop horizontal footage to vertical. For
        horizontal gameplay or screen recordings, split into clips here
        first, then crop to 9:16 in your editing app (most editors have a
        one-tap vertical crop). If you record vertically, your clips are
        Shorts-ready straight from the splitter.
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
