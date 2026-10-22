import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What is the WhatsApp Status video length limit?",
    a: "WhatsApp Status videos can be up to 90 seconds each. If your video is longer, split it into 90-second (or shorter) parts and post them as a multi-part status series.",
  },
  {
    q: "How do I split a long video for WhatsApp Status?",
    a: "Open SplitVideo, drop in your video, and use Every N sec with a 90-second interval (or 30s/60s for shorter updates). Split once, download all parts, and share them to your status in order.",
  },
  {
    q: "Will the video quality drop when I share to WhatsApp?",
    a: "WhatsApp compresses status videos. SplitVideo's default mode copies the original video stream without re-encoding, so starting from a clean, full-quality split gives you the best possible result after WhatsApp's compression.",
  },
];

export const Route = createFileRoute("/split-video-for-whatsapp-status")({
  head: () => ({
    meta: [
      {
        title:
          "Split Video for WhatsApp Status — Free 90s Clip Splitter | SplitVideo",
      },
      {
        name: "description",
        content:
          "Split long videos for WhatsApp Status free. 90-second parts, no watermark, no upload. Turn any recording into a multi-part status series in your browser.",
      },
      {
        property: "og:title",
        content: "Split Video for WhatsApp Status | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Long video? Split it into 90s status-ready parts. Free, no watermark, on-device.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/split-video-for-whatsapp-status",
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
        href: "https://www.splitvideo.in/split-video-for-whatsapp-status",
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
              name: "How to split a video for WhatsApp Status",
              description:
                "Split a long video into 90-second parts for a WhatsApp Status series using SplitVideo.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Add your video",
                  text: "Drop your MP4, MOV, or WebM into the splitter. It opens in your browser with no upload.",
                },
                {
                  "@type": "HowToStep",
                  name: "Split into 90-second parts",
                  text: "Use Every N sec with a 90-second interval so each part fits the WhatsApp Status limit.",
                },
                {
                  "@type": "HowToStep",
                  name: "Keep the full story",
                  text: "Splitting first means no part is trimmed away — every section of your video survives as its own status, in your recording's original frame.",
                },
                {
                  "@type": "HowToStep",
                  name: "Share in order",
                  text: "Download the parts and post them to your WhatsApp Status in sequence — viewers get the full video as a series.",
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
    <SeoPageLayout title="Split Video for WhatsApp Status">
      <p className="text-foreground">
        WhatsApp cuts Status videos off at 90 seconds — so a 5-minute recording
        needs splitting first. SplitVideo's{" "}
        <Link to="/" className="text-accent hover:underline">
          free video splitter
        </Link>{" "}
        divides any video into 90-second, status-ready parts in one go: free,
        no watermark, right in your browser.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The 90-second problem, solved
      </h2>
      <p>
        Anything longer than 90 seconds gets trimmed by WhatsApp, and the
        ending — usually the point — is what disappears. Splitting beforehand
        means every part lands intact, in order, as a multi-part status series
        your contacts can tap through.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        How to do it
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open the{" "}
          <Link to="/" className="text-accent hover:underline">
            free video splitter
          </Link>{" "}
          and drop in your video.
        </li>
        <li>
          Choose <em>Every N sec</em> mode and set a{" "}
          <strong className="text-foreground">90-second</strong> interval (use
          30s or 60s for punchier updates).
        </li>
        <li>
          Press <strong className="text-foreground">Split video</strong>, then
          download all parts — individually or as one ZIP.
        </li>
        <li>
          Post the parts to your Status in order — they are named in
          sequence, so they line up correctly in your gallery.
        </li>
      </ol>

      <h2 className="text-xl font-semibold text-foreground">
        Worked example: a 7-minute video
      </h2>
      <p>
        A 7-minute recording — a school function, a short speech, a match
        highlight reel — at a 90-second interval becomes five parts: four
        full 90-second statuses and a final 30-second one. Post all five
        back to back and your contacts see the complete video as a series,
        each part under the limit, nothing trimmed away. The maths
        generalises: minutes × 60 ÷ 90, rounded up, is your part count. One
        SplitVideo run makes up to 24 parts, which covers a full 36 minutes
        at 90 seconds; for anything longer, split in two ranges and post
        both sets in order.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        One quality truth about Status
      </h2>
      <p>
        WhatsApp compresses every Status video — that happens after
        splitting, on WhatsApp's side, and no tool can prevent it. What you
        control is the input: because SplitVideo's default mode copies your
        original video stream without re-encoding, WhatsApp receives the
        cleanest possible source and its compression has good material to
        work with. When quality matters more than the Status format — a
        video you are sending to one person, not broadcasting — skip Status
        and send the parts in a chat as documents instead, which avoids the
        compression entirely.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Why not just let WhatsApp trim it?
      </h2>
      <p>
        WhatsApp's built-in trimmer only keeps the first 90 seconds and
        discards the rest. Pre-splitting gives you <em>all</em> of the video as
        consecutive statuses — better for event recordings, speeches, match
        highlights, and anything where the ending matters.
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
