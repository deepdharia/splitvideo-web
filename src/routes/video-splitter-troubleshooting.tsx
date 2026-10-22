import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

const FAQ = [
  {
    q: "Why won't my video file load in SplitVideo?",
    a: "Almost always the codec: SplitVideo can only split what your browser can play. HEVC files from iPhones may not open in desktop Chrome or Firefox (try Safari), and MKV files are not supported by most browsers at all. If the same file plays in a desktop player like VLC but not in any browser, convert it to MP4 (H.264) first with a free converter such as HandBrake.",
  },
  {
    q: "Why did the export stop or the tab reload on a large file?",
    a: "Memory. The browser ran out of its per-tab budget while holding a large video and its clips. Close other tabs, keep the device plugged in and awake, and split the video in ranges — first half, then second half — instead of all at once. Files above roughly 8 GB are best done in a desktop browser.",
  },
  {
    q: "Why does my clip start about a second before or after my cut point?",
    a: "That is keyframe snapping, and it is the price of lossless splitting: cuts can only begin at keyframes, the complete frames stored every second or so. For an exact boundary — dialogue, a music cue, a goal — re-export that clip with the H.264 option enabled; re-encoding makes the cut frame-exact.",
  },
];

export const Route = createFileRoute("/video-splitter-troubleshooting")({
  head: () => ({
    meta: [
      {
        title: "Video Splitter Troubleshooting — Fixes for Common Problems | SplitVideo",
      },
      {
        name: "description",
        content:
          "File won't load, export stops on a big video, cuts land a second off, clips play without sound? The causes and fixes for splitting video in a browser, in the order they actually happen.",
      },
      {
        property: "og:title",
        content: "Video Splitter Troubleshooting | SplitVideo",
      },
      {
        property: "og:description",
        content:
          "Codec won't load, tab reloads on huge files, cuts off by a second — what each symptom means and how to fix it.",
      },
      {
        property: "og:url",
        content: "https://www.splitvideo.in/video-splitter-troubleshooting",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.splitvideo.in/video-splitter-troubleshooting",
      },
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
    <SeoPageLayout title="Video splitter troubleshooting">
      <p className="text-foreground">
        Because SplitVideo runs entirely in your browser, its failure modes
        are browser failure modes — codecs, memory, and file access — not
        server errors. Work through the symptom you have; each one lists the
        cause first, then the fix that actually addresses it.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The file will not load
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> your browser
        cannot decode the video's codec, or the file is not really on your
        device. iPhone HEVC recordings often refuse to open in desktop Chrome
        or Firefox; MKV files are unsupported by nearly every browser; a
        video still sitting in iCloud or Google Photos has nothing local to
        read.
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> try the browser
        that matches the file — Safari for iPhone recordings. Make sure the
        video is downloaded to the device. If no browser will play it,
        convert it to MP4 (H.264 + AAC) with a free desktop tool such as
        HandBrake or VLC, then split the converted file. The rule of thumb:
        if your browser cannot play it, no on-device tool can split it.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The export stops, or the tab crashes or reloads
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> memory. Splitting
        holds the source and the finished clips in the tab's memory budget,
        and phones enforce that budget strictly — iOS reloads the tab when it
        is exceeded, which looks like the tool "just restarting".
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> close other tabs
        and apps, plug the device in, and keep the screen awake. Then split
        in{" "}
        <Link to="/how-to-split-a-video" className="text-accent hover:underline">
          ranges
        </Link>{" "}
        — first half, then second — so each run holds less. For files above
        roughly 8 GB, use a desktop browser; the{" "}
        <Link to="/split-large-video-files" className="text-accent hover:underline">
          large files guide
        </Link>{" "}
        shows what is realistic at that size.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        A cut lands about a second off
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> keyframe
        snapping. Lossless cuts can only start at a keyframe — the complete
        frames a video stores every second or so — so the boundary moves to
        the nearest one. The tool's own note says the same: cuts follow
        keyframes, so the start can land up to about a second early.
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> for moments where
        a second matters, enable the{" "}
        <strong className="text-foreground">H.264 option</strong> for that
        export. Re-encoding is slower and uses more battery, but the cut
        lands exactly where you placed it. Use lossless for bulk splitting
        and H.264 for the few clips that need precision.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        A clip plays with no sound
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> usually the
        player, not the clip. The default export copies the original audio
        stream unchanged; some players cannot decode less common audio
        codecs and play the video silently instead of warning you.
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> test the clip in a
        second player (VLC plays nearly everything) before re-doing work. If
        the sound is missing everywhere, re-export with the H.264
        compatibility option, which produces the most widely playable
        output.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        The ZIP will not download or open
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> a ZIP holding
        many large clips is itself a large file, and a nearly-full device or
        a restrictive phone browser can fail it silently.
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> free some storage —
        your clips together are about the size of the original — and if the
        ZIP still fails, download the clips individually from the results
        list instead. On Android, extract ZIPs with Files by Google; on
        iPhone, the Files app opens them.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        It works on my computer but not on my phone
      </h2>
      <p>
        <strong className="text-foreground">Cause:</strong> the phone
        specifics — most often the page is open inside another app's
        built-in browser, which restricts file access, or the video is a
        cloud copy rather than a local file.
      </p>
      <p>
        <strong className="text-foreground">Fix:</strong> open{" "}
        <Link to="/split-video-on-phone" className="text-accent hover:underline">
          the phone guide
        </Link>{" "}
        and follow the platform steps there: real Safari or Chrome (not an
        in-app browser), the video downloaded to the device, and range
        splits for the biggest recordings.
      </p>

      <h2 className="text-xl font-semibold text-foreground">
        Still stuck?
      </h2>
      <p>
        Email{" "}
        <a href="mailto:build@splitvideo.in" className="text-accent hover:underline">
          build@splitvideo.in
        </a>{" "}
        with your device, your browser, and the video's format and size —
        that combination identifies nearly every remaining case, and reports
        from real files are how the tool gets better.
      </p>

      <p className="pt-2">
        <Link
          to="/"
          className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Back to the video splitter
        </Link>
      </p>
    </SeoPageLayout>
  );
}
