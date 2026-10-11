import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/video-splitter-faq")({
  head: () => ({
    meta: [
      { title: "Video Splitter FAQ — Answers about SplitVideo.in" },
      { name: "description", content: "Frequently asked questions about SplitVideo: privacy, equal parts, time splits, quality, iPhone, Android, supported formats, and how the free on-device splitter works." },
      { property: "og:title", content: "Video Splitter FAQ | SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/video-splitter-faq" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/video-splitter-faq" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Video splitter FAQ">
      <p className="text-foreground">Straightforward answers about how SplitVideo works, privacy, equal parts, time splits, quality, and mobile use.</p>
      <div className="space-y-6">        <article className="glass rounded-2xl p-5"><h2 className="text-lg font-semibold text-foreground">The export starts before my cut. Is that a bug?</h2><p className="mt-2">Lossless splitting can move the start to an earlier keyframe so the clip can decode correctly. The spacing of keyframes is set by the source recording. Check actual output durations when a platform has a strict limit; do not assume every lossless cut will be frame-exact.</p></article>
        <article className="glass rounded-2xl p-5"><h2 className="text-lg font-semibold text-foreground">My file is MP4 but will not open. What should I check?</h2><p className="mt-2">MP4 describes the container, not the video codec inside it. Try playing the original in the same browser first. If it cannot play, try another up-to-date browser or export a compatible copy from your recording app. Keep the original. Renaming a file extension does not convert its codec.</p></article>
        <article className="glass rounded-2xl p-5"><h2 className="text-lg font-semibold text-foreground">Why does a large recording stop processing?</h2><p className="mt-2">Browser memory, available storage, codec support, and device resources all affect processing. Close unused tabs, keep this tab in the foreground, and try a shorter recording. A file-size promise alone cannot guarantee success on every phone. Refreshing the page discards the current in-memory session, so save completed clips first.</p></article>
        <article className="glass rounded-2xl p-5"><h2 className="text-lg font-semibold text-foreground">Where did my download go?</h2><p className="mt-2">Check your browser’s downloads list and your device’s Downloads folder. A video saved as a file may not appear automatically in Photos. On mobile, open the saved clip and use the available share or save options. Before leaving the page, verify that the saved file plays outside the splitter.</p></article>

        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">Is my video uploaded?</h2>
          <p className="mt-2">No. The selected file is processed in the browser on your device. There is no server-side encode step for the original video.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">How do I split into equal parts?</h2>
          <p className="mt-2">Load the video, choose <strong>Equal parts</strong>, set how many clips you want, and press Split video. See the <Link to="/split-video-into-equal-parts" className="text-accent hover:underline">equal parts guide</Link>.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">How do I split by time?</h2>
          <p className="mt-2">Choose <strong>Every N sec</strong>, enter the length in seconds, and run the split. More detail in the <Link to="/split-video-by-time" className="text-accent hover:underline">time split guide</Link>.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">Does splitting reduce quality?</h2>
          <p className="mt-2">The default path aims to copy the original picture. An optional H.264 option re-encodes for broader compatibility and may introduce a small quality change.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">Does it work on iPhone and Android?</h2>
          <p className="mt-2">Yes. See the <Link to="/split-video-on-iphone" className="text-accent hover:underline">iPhone guide</Link> and <Link to="/split-video-on-android" className="text-accent hover:underline">Android guide</Link>.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">Is it free?</h2>
          <p className="mt-2">Yes. The tool is free to use. Processing happens on your device.</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">Email <a href="mailto:build@splitvideo.in" className="text-accent hover:underline">build@splitvideo.in</a>.</p>
        </article>
      </div>
      <p className="pt-4"><Link to="/" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Go to the video splitter</Link></p>
    </SeoPageLayout>
  );
}
