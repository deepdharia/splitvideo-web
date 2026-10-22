import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "What is the largest video SplitVideo can split?",
    a: "There is no file-size limit set by SplitVideo, because the file is never uploaded — the practical limit is your device's memory and free storage. A 15 GB recording has been split on a desktop browser; on a phone, files of a few gigabytes are realistic, especially when split in ranges.",
  },
  {
    q: "Does splitting a very large video reduce its quality?",
    a: "No. The default mode copies the original video and audio streams into each part without re-encoding, at any file size. A clip from a 15 GB recording is the same picture data as the source — only shorter.",
  },
  {
    q: "Why did my huge file fail to load?",
    a: "The usual causes are a codec your browser cannot decode, a phone browser running out of memory while reading the file, or the video still being in cloud storage rather than on the device. The troubleshooting page walks through each one.",
  },
];

export const Route = createFileRoute("/split-large-video-files")({
  head: () => ({
    meta: [
      {
        title: "Split Large Video Files (Even 15 GB) in Your Browser | SplitVideo",
      },
      {
        name: "description",
        content:
          "No upload means no server size cap. A first-hand case study: a 15.09 GB, 34-minute gameplay recording split into 24 parts in a browser — plus the memory, storage, and range strategy that makes big files work.",
      },
      {
        property: "og:title",
        content: "Split Large Video Files in Your Browser | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "A real 15.09 GB recording, split into 24 parts on-device. What limits big-file splitting in a browser, and the playbook that works.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/split-large-video-files",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/split-large-video-files" },
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
    <SeoPageLayout title="Splitting very large video files">
      <p className="text-foreground">
        Most online splitters reject multi-gigabyte files, because their
        business model starts with uploading your video to their server.
        SplitVideo never uploads, so there is no server cap to hit — the real
        limits are your device's memory and storage. This page documents an
        actual large-file job done with this tool, then the playbook for
        repeating it.
      </p>
      <p className="text-xs uppercase tracking-[0.18em]">
        Case study · October 2026 · Last updated 23 October 2026
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The job: one 15.09 GB recording, 24 parts
      </h2>
      <p>
        SplitVideo's creator records gameplay sessions on an iPad. One
        session — recorded on 20 October 2026 — came to{" "}
        <strong className="text-foreground">15.09 GB</strong> for a{" "}
        <strong className="text-foreground">34-minute</strong> video. A single
        file that size is unusable for Shorts or Reels, and uploading it
        anywhere would take longer than editing it. Instead it was split with
        this tool, in the browser, into{" "}
        <strong className="text-foreground">24 equal parts</strong> of about
        85 seconds each — a ready series of clips from one session, with the
        original quality untouched.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-semibold text-foreground">Source file</td>
              <td className="py-2">Screen recording (QuickTime / MP4), H.264 + AAC</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-semibold text-foreground">Size</td>
              <td className="py-2">15.09 GB (15,089,641,601 bytes)</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-semibold text-foreground">Duration / resolution</td>
              <td className="py-2">34 min 1 sec · 2880 × 1800</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4 font-semibold text-foreground">Split</td>
              <td className="py-2">Equal parts × 24 (≈85 seconds each), one run</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold text-foreground">Result</td>
              <td className="py-2">24 MP4 clips, exported the same afternoon, nothing uploaded</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        src="/images/split-15gb-recording-24-clips.webp"
        alt="Mac Finder windows showing a 15.09 GB screen recording (34 minutes, 2880 by 1800) alongside the 24 numbered MP4 parts it was split into"
        className="w-full rounded-2xl border border-border/60"
        loading="lazy"
      />
      <p>
        The Finder windows above are the job itself: the original recording's
        file information on the left, and the 24 resulting parts — _01
        through the final clip — on the right.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Why a browser can do this at all
      </h2>
      <p>
        Two design choices make it possible. First, the file is read{" "}
        <strong className="text-foreground">locally</strong> — your browser
        opens it from your disk or phone storage, so "uploading 15 GB" (the
        step that makes server tools slow or impossible) simply does not
        exist. Second, the default export{" "}
        <strong className="text-foreground">copies the existing video and audio
        streams</strong> into each part instead of re-encoding them. Copying
        is bounded by your storage speed, not your processor, which is why a
        job this size finishes in minutes rather than the better part of an
        hour — and why every part keeps the source quality exactly.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The big-file playbook
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Prefer a desktop browser for files above ~8 GB.</strong>{" "}
          Phones can do a lot (see the{" "}
          <Link to="/split-video-on-phone" className="text-accent hover:underline">
            phone guide
          </Link>
          ), but tab memory limits make very large files a desktop job.
        </li>
        <li>
          <strong className="text-foreground">Check free storage first.</strong>{" "}
          Your parts together are roughly the size of the original — a 15 GB
          job needs about 15 GB free.
        </li>
        <li>
          <strong className="text-foreground">Use ranges to stage huge jobs.</strong>{" "}
          If a full run strains your machine, export the first half as a
          range, then the second, and split each half separately.
        </li>
        <li>
          <strong className="text-foreground">Keep the machine awake.</strong>{" "}
          A laptop that sleeps mid-export pauses the browser; plug in for
          long runs.
        </li>
        <li>
          <strong className="text-foreground">Stay in the lossless default.</strong>{" "}
          The H.264 re-encode option on a 15 GB file means re-encoding 15 GB —
          far slower and harder on memory. Use it for small, precision cuts,
          not bulk splitting.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">
        Honest expectations by file size
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 text-foreground">
              <th className="py-2 pr-4 font-semibold">File size</th>
              <th className="py-2 font-semibold">What to expect</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4">Up to ~2 GB</td>
              <td className="py-2">Any modern phone or computer handles this comfortably.</td>
            </tr>
            <tr className="border-b border-border/40">
              <td className="py-2 pr-4">~2–8 GB</td>
              <td className="py-2">Desktop is easy; recent phones manage, ranges help older ones.</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">~8–16 GB</td>
              <td className="py-2">Use a desktop browser with storage headroom — the 15.09 GB case above sits here.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        And the honest boundary: if your file uses a codec your browser
        cannot play at all, or you need frame-by-frame editing rather than
        splitting, a desktop editor is the right tool. For everything a
        browser can play, splitting it here is usually the fastest path from
        one huge recording to a set of usable clips. If a big file fails, the{" "}
        <Link to="/video-splitter-troubleshooting" className="text-accent hover:underline">
          troubleshooting page
        </Link>{" "}
        covers the causes in order.
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
