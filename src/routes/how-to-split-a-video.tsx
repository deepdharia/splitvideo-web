import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "Why is my last clip shorter than the others?",
    a: "Because the recording rarely divides exactly. Splitting a 34-minute video every 90 seconds gives 22 full clips plus a final shorter one with the remainder. That last clip is complete — it is just the tail of the recording, not a cut-off.",
  },
  {
    q: "Can I split an MP4 without losing quality?",
    a: "Yes. SplitVideo's default mode copies the original video and audio streams into each clip instead of re-encoding them, so the picture and sound are the same data as the source file. The optional H.264 mode re-encodes, which trades a little quality and speed for frame-exact cuts.",
  },
  {
    q: "Why does a clip sometimes start a fraction of a second early or late?",
    a: "Lossless cuts can only land on keyframes — the complete frames a video stream stores every second or so. If your cut point falls between keyframes, the clip boundary snaps to the nearest one. When a cut must be exact (a punchline, a goal, a beat), use the H.264 re-encode option for that export.",
  },
];

export const Route = createFileRoute("/how-to-split-a-video")({
  head: () => ({
    meta: [
      {
        title: "How to Split a Video Online — Equal Parts, By Time, Cut Points | SplitVideo",
      },
      {
        name: "description",
        content:
          "Four ways to split a video in your browser: equal parts, fixed time intervals, custom cut points, or a single range. Worked examples, honest limits, and the keyframe tip that makes cuts land where you expect.",
      },
      {
        property: "og:title",
        content: "How to Split a Video Online | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Equal parts, fixed intervals, custom cut points, or one range — a practical guide to splitting video on-device, with worked examples.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/how-to-split-a-video",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/how-to-split-a-video" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "HowTo",
              name: "How to split a video online",
              description:
                "Split a video into equal parts, fixed time intervals, custom cut points, or a single range using SplitVideo in your browser.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Add your video",
                  text: "Open SplitVideo and choose your MP4, MOV, or WebM file. It loads on your device — nothing is uploaded.",
                },
                {
                  "@type": "HowToStep",
                  name: "Choose a split mode",
                  text: "Pick Equal parts, Every N sec, Cut points, or Range depending on the clips you need.",
                },
                {
                  "@type": "HowToStep",
                  name: "Set the details",
                  text: "Enter the number of parts, the interval in seconds, your cut points on the timeline, or the start and end of the range.",
                },
                {
                  "@type": "HowToStep",
                  name: "Split and download",
                  text: "Press Split video and download the clips individually or as one ZIP file.",
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
    <SeoPageLayout title="How to split a video">
      <p className="text-foreground">
        There are four useful ways to split a video, and the right one depends
        on what the clips are for. SplitVideo's{" "}
        <Link to="/" className="text-accent hover:underline">
          free video splitter
        </Link>{" "}
        does all four in your browser — equal parts, fixed time intervals,
        custom cut points, and single ranges — with no upload and no watermark.
        This guide explains each mode with worked examples, plus the limits
        worth knowing before you start.
      </p>

      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Answer first</h2>
        <p className="mt-2">
          Need a set number of clips? <strong className="text-foreground">Equal parts</strong>.
          Need clips of an exact length — 30s, 60s, 90s?{" "}
          <strong className="text-foreground">Every N sec</strong>. Know the exact
          moments to cut? <strong className="text-foreground">Cut points</strong>.
          Only need one section? <strong className="text-foreground">Range</strong>.
        </p>
      </div>

      <img
        src="/images/splitvideo-split-modes.webp"
        alt="The SplitVideo splitter with a video loaded, showing the four split modes: Equal parts, Every N sec, Cut points, and Range"
        className="w-full rounded-2xl border border-border/60"
        loading="lazy"
      />

      <h2 id="equal-parts" className="text-xl font-semibold text-foreground">
        1. Equal parts — a set number of clips
      </h2>
      <p>
        Equal parts divides the whole video by count rather than by time. A
        60-minute recording split into 6 parts gives six 10-minute clips; a
        34-minute recording split into 24 gives parts of about 85 seconds
        each. Choose this when the destination decides the count — a series of
        uploads, a set of lessons, or splitting a file that is too large to
        send in one piece.
      </p>
      <p>
        Parts are divided by duration, and one run can create{" "}
        <strong className="text-foreground">up to 24 clips</strong>. If you
        need more parts than that, split the video into two ranges first and
        run each range separately.
      </p>

      <h2 id="by-time" className="text-xl font-semibold text-foreground">
        2. Every N sec — clips of an exact length
      </h2>
      <p>
        This mode cuts at a fixed interval: every 15, 30, 60, or 90 seconds,
        or any length you enter. It is the natural fit for platforms with a
        per-clip limit — a long video becomes a ready-made series of{" "}
        <Link to="/split-video-for-whatsapp-status" className="text-accent hover:underline">
          WhatsApp Status parts
        </Link>{" "}
        at 90 seconds each, or Shorts-length pieces at 60.
      </p>
      <p>
        Do the maths before a long recording: clips per run is capped at 24,
        so a 90-second interval covers up to 36 minutes in one run. A
        50-minute video at 90 seconds needs 34 clips — split it as two ranges
        (0:00–25:00 and 25:00–50:00) and run each half. The final clip of a run
        is the remainder, so it is usually shorter than the rest; that is
        expected, not an error.
      </p>

      <h2 id="cut-points" className="text-xl font-semibold text-foreground">
        3. Cut points — cut exactly where the moments are
      </h2>
      <p>
        When the content decides the cuts — highlights in a match, answers in
        an interview, steps in a tutorial — place cut points on the timeline
        instead. Scrub to each moment, add a point, and every segment between
        points becomes its own clip. This is slower than the automatic modes
        but it is the only one that respects what is actually in the video.
      </p>
      <img
        src="/images/splitvideo-timeline-cut-points.webp"
        alt="The SplitVideo timeline in Cut points mode with two cut points placed on a video, ready to export three clips"
        className="w-full rounded-2xl border border-border/60"
        loading="lazy"
      />
      <p>
        A practical workflow: watch once at high speed and drop rough points,
        then nudge each point while previewing the seconds around it. Export,
        and your clips are named in order so they stay sequenced in your file
        manager.
      </p>

      <h2 id="range" className="text-xl font-semibold text-foreground">
        4. Range — keep one section, ignore the rest
      </h2>
      <p>
        Range exports a single start-to-end section: the one goal from a full
        match, the one answer from an hour-long call. It is also the helper
        mode for big jobs — use ranges to divide a very long or very large
        recording into halves before applying equal parts or intervals to each
        half, which is gentler on your device's memory. For files measured in
        gigabytes, see the{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large video files guide
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Which mode should you use?
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 text-foreground">
              <th className="py-2 pr-4 font-semibold">Your goal</th>
              <th className="py-2 pr-4 font-semibold">Mode</th>
              <th className="py-2 font-semibold">Typical setting</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4">A series of uploads from one recording</td>
              <td className="py-2 pr-4">Equal parts</td>
              <td className="py-2">4–12 parts</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4">Clips that fit a platform limit</td>
              <td className="py-2 pr-4">Every N sec</td>
              <td className="py-2">30s, 60s, or 90s</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4">Highlights and moments</td>
              <td className="py-2 pr-4">Cut points</td>
              <td className="py-2">One point per moment</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">One section of a long video</td>
              <td className="py-2 pr-4">Range</td>
              <td className="py-2">Start and end time</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        The keyframe detail that explains most "wrong" cuts
      </h2>
      <p>
        Video streams store complete pictures — keyframes — every second or
        so, with the frames between them stored as changes. A lossless cut can
        only begin at a keyframe, so by default a SplitVideo clip can start up
        to about a second from the exact point you picked, and in return it is
        fast and bit-for-bit identical to the source. When a boundary must be
        exact, enable the optional H.264 re-encode for that export: slower,
        frame-exact, and the right trade for dialogue and music cues.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Honest limits
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Up to 24 clips per run</strong> —
          use two ranges for longer series.
        </li>
        <li>
          <strong className="text-foreground">Your browser must be able to play the file.</strong>{" "}
          MP4, MOV, and WebM from phones and recorders work; an exotic codec
          that your browser cannot decode cannot be split on-device.
        </li>
        <li>
          <strong className="text-foreground">Size is limited by device memory, not by us.</strong>{" "}
          There is no upload cap because there is no upload — but a phone with
          little free memory will struggle with multi-gigabyte files. The{" "}
          <Link to="/split-large-video-files" className="text-accent hover:underline">
            large files guide
          </Link>{" "}
          covers what actually works, up to a real 15 GB recording.
        </li>
        <li>
          <strong className="text-foreground">The original frame is kept.</strong>{" "}
          SplitVideo does not crop, pad, or reformat — vertical versions are a
          job for your editor after splitting.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
      <div className="space-y-4">
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold text-foreground">{f.q}</h3>
            <p className="mt-1">{f.a}</p>
          </div>
        ))}
      </div>

      <p>
        Splitting on a phone instead? The{" "}
        <Link to="/split-video-on-phone" className="text-accent hover:underline">
          phone guide
        </Link>{" "}
        covers iPhone and Android specifics. Something not working? See{" "}
        <Link to="/video-splitter-troubleshooting" className="text-accent hover:underline">
          troubleshooting
        </Link>
        .
      </p>

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
