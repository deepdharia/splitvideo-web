import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SplitVideo.in — On-Device Video Splitter" },
      {
        name: "description",
        content:
          "About SplitVideo.in. Built for creators and gamers who need a simple, private way to turn long recordings into equal or timed clips without uploading the file.",
      },
      { property: "og:title", content: "About SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="About SplitVideo">
      <p className="text-foreground">
        SplitVideo.in is a free, browser-based video splitter that keeps your
        files on your device.
      </p>

      <h2 className="text-xl font-semibold text-foreground">Why it exists</h2>
      <p>
        The tool was built from a practical need shared by many gaming creators
        and YouTubers: long gameplay or screen recordings that had to be broken
        into equal-length clips for Shorts, Reels, multi-part uploads, or simple
        sharing. Existing online tools often required uploading the full file,
        imposed size limits, added watermarks, or felt unnecessarily complicated
        for a quick split. Offline editors could be heavy for a one-time task.
      </p>
      <p>
        SplitVideo focuses on a simple workflow: pick a video, choose equal
        parts, a fixed time interval, a range, or custom cut points, and export.
        Processing runs in the browser so the original recording does not need
        to leave the phone or computer.
      </p>

      <h2 className="text-xl font-semibold text-foreground">What the tool does</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Split a video into equal parts</li>
        <li>Split by time (every N seconds)</li>
        <li>Export a single range</li>
        <li>Place custom cut points</li>
        <li>Works in modern browsers on iPhone, Android, and desktop</li>
        <li>Default path aims to preserve original quality</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">Privacy focus</h2>
      <p>
        Because the original file stays on the device, the tool is suitable for
        personal recordings, private footage, and long sessions where uploading
        first would be slow or undesirable. See the{" "}
        <Link to="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </Link>{" "}
        for more detail.
      </p>

      <h2 className="text-xl font-semibold text-foreground">Contact</h2>
      <p>
        Questions, feedback, or issues can be sent to{" "}
        <a href="mailto:build@splitvideo.in" className="text-accent hover:underline">
          build@splitvideo.in
        </a>
        .
      </p>

      <p className="pt-4">
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
