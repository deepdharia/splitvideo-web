import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "Why does Safari reload the page when I split a very large file?",
    a: "Safari gives each tab a memory budget, and a multi-gigabyte video plus its exported clips can exceed it, so iOS reloads the tab. Split the video in ranges — first half, then second half — keep the phone plugged in, and close other tabs before you start. Desktop browsers have far more memory headroom for the biggest files.",
  },
  {
    q: "Where do the clips go after I split a video on Android?",
    a: "Chrome downloads each clip to your Downloads folder, or offers the system share sheet so you can save to Gallery, Drive, or send the clip directly. If you exported the ZIP, open it in Files by Google or your file manager to extract the clips.",
  },
  {
    q: "Can I split a video that is still in iCloud or Google Photos?",
    a: "The video has to be on the device first. In Apple Photos, open the video and let it finish downloading (or choose Download and Keep Original for recordings you split often). In Google Photos, use Download so the file exists in your downloads, then pick it in SplitVideo.",
  },
];

export const Route = createFileRoute("/split-video-on-phone")({
  head: () => ({
    meta: [
      {
        title: "Split Video on Your Phone — iPhone & Android, No App Needed | SplitVideo",
      },
      {
        name: "description",
        content:
          "Split videos right in your phone browser — Safari on iPhone, Chrome on Android. No app install, no upload. Platform-specific steps, where clips are saved, and fixes for big-file memory limits.",
      },
      {
        property: "og:title",
        content: "Split Video on Your Phone | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "iPhone and Android steps for splitting video in the browser: picking from Photos, saving with the share sheet, and handling large recordings.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/split-video-on-phone",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://www.splitvideo.in/split-video-on-phone" },
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
    <SeoPageLayout title="Split video on your phone">
      <p className="text-foreground">
        You do not need an app to split a video on your phone. SplitVideo runs
        in the browser you already have — Safari on iPhone, Chrome on Android —
        and processes the file on the device, so nothing is uploaded and no
        account or install is involved. The steps are the same on both
        platforms; what differs is where videos live, how saving works, and
        where the limits are. This page covers each platform separately.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        On iPhone (Safari)
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open{" "}
          <Link to="/" className="text-accent hover:underline">
            splitvideo.in
          </Link>{" "}
          in Safari and tap to choose a video.
        </li>
        <li>
          Pick the recording from <strong className="text-foreground">Photos</strong> or{" "}
          <strong className="text-foreground">Files</strong>. Screen recordings and
          camera videos are usually MP4 or MOV, both fine.
        </li>
        <li>
          Choose a mode —{" "}
          <Link to="/how-to-split-a-video" className="text-accent hover:underline">
            equal parts, intervals, cut points, or a range
          </Link>{" "}
          — and press <strong className="text-foreground">Split video</strong>.
        </li>
        <li>
          Save each clip with the share sheet:{" "}
          <strong className="text-foreground">Save Video</strong> puts it in
          Photos next to the original.
        </li>
      </ol>
      <p>
        Two iPhone specifics worth knowing. First, if the video shows a cloud
        icon in Photos, it is stored in iCloud, not on the phone — open it and
        let it download fully before splitting, or the picker may stall.
        Second, iPhone screen recordings can be HEVC; they play and split fine
        in Safari on the phone itself, but if a clip later refuses to play on
        an older Windows PC, re-export that clip with the H.264 option enabled
        for maximum compatibility.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        On Android (Chrome)
      </h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open{" "}
          <Link to="/" className="text-accent hover:underline">
            splitvideo.in
          </Link>{" "}
          in Chrome (Samsung Internet also works) and choose your video.
        </li>
        <li>
          Pick from Gallery, Downloads, or your file manager. Android screen
          recordings are typically MP4 with H.264 — the most compatible
          combination there is.
        </li>
        <li>Choose a mode and press <strong className="text-foreground">Split video</strong>.</li>
        <li>
          Clips download to your Downloads folder, or use the share option to
          send one straight to WhatsApp, Drive, or another app. A ZIP export
          can be extracted with Files by Google.
        </li>
      </ol>
      <p>
        One Android trap: links opened inside other apps (an in-app browser in
        a social or messaging app) often have restricted file access. If the
        picker or downloads misbehave, open the page in Chrome itself via
        "Open in browser". And on phones with 3–4 GB of RAM, prefer range
        splits for recordings over a couple of gigabytes — half at a time is
        far more reliable than all at once.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Big recordings on a phone — what actually helps
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-foreground">Split in ranges.</strong> Halves or
          thirds keep memory use per run low; each range then gets its own
          equal-parts or interval split.
        </li>
        <li>
          <strong className="text-foreground">Keep the phone awake and plugged in</strong>{" "}
          during long exports — a screen that sleeps mid-export can pause the
          browser's work.
        </li>
        <li>
          <strong className="text-foreground">Free some storage first.</strong>{" "}
          The clips need roughly as much space as the parts of the original
          they cover.
        </li>
        <li>
          <strong className="text-foreground">Close other tabs and apps.</strong>{" "}
          The browser's memory budget is shared with everything else running.
        </li>
      </ul>
      <p>
        For files in the multi-gigabyte range there is a fuller write-up,
        including a real 15 GB recording split on this tool, in the{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large video files guide
        </Link>
        . If something fails outright, the{" "}
        <Link to="/video-splitter-troubleshooting" className="text-accent hover:underline">
          troubleshooting page
        </Link>{" "}
        lists the common causes and fixes.
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
