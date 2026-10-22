import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitterApp } from "@/components/splitter-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Split Video Online Free | SplitVideo — On-Device Video Splitter",
      },
      {
        name: "description",
        content:
          "SplitVideo — free online video splitter. Split any video into equal parts or by time in your browser. No upload, no watermark. Works on iPhone, Android & desktop.",
      },
      {
        property: "og:title",
        content: "Split Video Online Free | SplitVideo — On-Device Video Splitter",
      },
      {
        property: "og:description",
        content:
          "Free online video splitter. Split into equal parts or by time. No upload. Works on phone and desktop.",
      },
      { property: "og:url", content: "https://www.splitvideo.in/" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SplitVideo.in" },
      { property: "og:image", content: "https://www.splitvideo.in/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Split Video Online Free | SplitVideo",
      },
      {
        name: "twitter:description",
        content:
          "Free online video splitter. Equal parts or by time. No upload. iPhone & Android.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "SplitVideo",
              alternateName: [
                "Split Video",
                "SplitVideo.in",
                "Online Video Splitter",
                "Free Video Splitter",
              ],
              url: "https://www.splitvideo.in/",
              description:
                "Free online video splitter that works in your browser. Split any video into equal parts or by time. No upload, no watermark. On-device processing for iPhone, Android, and desktop.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any (modern browser)",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              browserRequirements: "Requires a modern browser with File API and Media support (Chrome, Safari, Firefox, Edge).",
              featureList: [
                "Split video into equal parts",
                "Split by fixed time interval",
                "Custom cut points",
                "Range export",
                "On-device processing",
                "No file upload",
                "Works on iPhone and Android browsers",
              ],
              image: "https://www.splitvideo.in/og.jpg",
              screenshot: "https://www.splitvideo.in/og.jpg",
            },
            {
              "@type": "Organization",
              name: "SplitVideo",
              alternateName: "SplitVideo.in",
              url: "https://www.splitvideo.in/",
              email: "build@splitvideo.in",
              logo: "https://www.splitvideo.in/favicon.svg",
              image: "https://www.splitvideo.in/og.jpg",
              description:
                "SplitVideo is a free online video splitter. Split videos into equal parts or by time on your device — no upload required.",
              sameAs: ["https://www.linkedin.com/company/splitvideo/"],
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <SplitterApp />

      <section
        aria-labelledby="proof-title"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Proven on real recordings
          </p>
          <h2
            id="proof-title"
            className="mt-2 text-2xl font-semibold sm:text-3xl"
          >
            A 15 GB recording, split into 24 parts — right in the browser
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            SplitVideo was built for exactly this job, and its creator uses it
            on his own gameplay recordings: one 15.09 GB session (34 minutes,
            2880×1800), split into 24 equal parts of about 85 seconds — fast,
            with nothing uploaded. The default mode copies the original video
            stream instead of re-encoding it, so every part keeps the source
            quality and exports finish quickly. One run creates up to 24
            clips; for an even longer session, split it in two ranges.
          </p>
          <img
            src="/images/split-15gb-recording-24-clips.webp"
            alt="Mac Finder windows showing a 15.09 GB screen recording (34 minutes, 2880 by 1800) alongside the 24 numbered MP4 parts it was split into"
            className="mt-5 w-full rounded-2xl border border-border/60"
            loading="lazy"
          />
          <p className="mt-4 text-sm">
            <Link
              to="/split-large-video-files"
              className="font-medium text-accent hover:underline"
            >
              Read the full case study — specs, screenshots, and the big-file playbook →
            </Link>
          </p>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="how-it-works-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Free online video splitter
          </p>
          <h2 id="how-it-works-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Split video online — equal parts or by time, on your device
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            SplitVideo is a free browser-based video splitter for turning one long
            recording into smaller, useful clips. Choose a range, divide the video
            into equal parts, create clips at a fixed interval, or add your own cut
            points. Everything runs in your browser — the original video is not
            uploaded to any server.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Split into equal parts</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Useful when a long gameplay or recording needs a predictable number
                of pieces. Select <strong>Equal parts</strong>, choose the number
                of parts, and export the resulting clips.
              </p>
              <Link
                to="/how-to-split-a-video"
                hash="equal-parts"
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                Learn more about equal parts →
              </Link>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Create clips by time</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Use <strong>Every N sec</strong> to turn a longer video into
                repeated time-based clips, or use <strong>Range</strong> when you
                only need one section of a recording.
              </p>
              <Link
                to="/how-to-split-a-video"
                hash="by-time"
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                Learn more about time splits →
              </Link>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Make custom cut points</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                For interviews, gameplay highlights, tutorials, and other
                recordings, place cut points on the timeline and export separate
                pieces from them.
              </p>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Use it on phone or desktop</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                SplitVideo works in modern mobile and desktop browsers. On
                supported devices, the system share sheet can be used to save or
                share exported clips.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <Link
                  to="/split-video-on-phone"
                  className="font-medium text-accent hover:underline"
                >
                  iPhone & Android guide →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="about-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Why SplitVideo exists
          </p>
          <h2 id="about-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Built by a gamer who needed equal clips from long sessions
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            SplitVideo.in started from a simple frustration common among gaming
            YouTubers and content creators: long gameplay recordings that needed
            to be broken into equal-length clips for Shorts, Reels, TikTok, or
            multi-part uploads. Most online tools required uploading the full
            file, waited on a server queue, or added watermarks. Offline editors
            were heavy or complicated for a quick split.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            The goal was a tool that stays on the device, keeps the original
            quality by default, works in the phone browser, and makes equal-part
            and time-based splitting straightforward. That is what SplitVideo
            delivers — a free, private, browser-based video splitter focused on
            practical creator workflows.
          </p>
        </div>
      </section>

      <section
        id="use-cases"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="use-cases-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Common use cases
          </p>
          <h2 id="use-cases-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            One video, many useful clips
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article>
              <h3 className="font-semibold">Social media clips</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Break longer recordings into shorter sections before editing or
                publishing them to Shorts, Reels, TikTok, or other platforms.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Gameplay and recordings</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Turn a long gameplay session, screen recording, or event recording
                into manageable equal clips without first uploading the source
                file.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Sharing large recordings</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Create smaller pieces from a large recording when a single file is
                inconvenient to send or store.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="privacy"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="privacy-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Privacy by design
          </p>
          <h2 id="privacy-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Your original video stays in the browser
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            SplitVideo is designed around local browser processing. The tool reads
            the selected video on your device and creates the exported clips
            locally. There is no need to upload the original recording to a
            video-processing server. This is useful for personal recordings,
            private footage, gaming sessions, and large files where uploading
            first would be slow or undesirable.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            Supported formats include common containers such as MP4, MOV, and
            other video types your browser can read. Processing limits depend on
            your device memory; very large files may work better when split into
            shorter ranges first.
          </p>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="faq-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Frequently asked questions
          </p>
          <h2 id="faq-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            About the video splitter
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article>
              <h3 className="font-semibold">Is my video uploaded?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                No. The splitter processes the selected file on your device in the
                browser. Nothing is sent to a remote server for encoding.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Can I split a video into equal parts?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Yes. Choose <strong>Equal parts</strong> and set how many clips you
                want to create. Each part receives a similar share of the total
                duration.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Can I split by seconds?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Yes. <strong>Every N sec</strong> creates time-based clips of the
                length you choose from the selected video.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Does it work on iPhone and Android?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Yes — Safari on iPhone, Chrome on Android. Pick a video from
                Photos or Files, split it, and save the clips with the share
                sheet. The{" "}
                <Link to="/split-video-on-phone" className="font-medium text-accent hover:underline">
                  phone guide
                </Link>{" "}
                covers each platform's specifics.
              </p>
            </article>
          </div>
          <p className="mt-6 text-sm text-muted">
            More detailed answers:{" "}
            <Link to="/video-splitter-faq" className="font-medium text-accent hover:underline">
              Video splitter FAQ
            </Link>
          </p>
        </div>
      </section>

      <section
        id="explore"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="explore-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Explore
          </p>
          <h2 id="explore-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Guides and related pages
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li>
              <Link to="/how-to-split-a-video" className="text-sm font-medium text-accent hover:underline">
                How to split a video — the complete guide
              </Link>
            </li>
            <li>
              <Link to="/free-video-splitter-no-watermark" className="text-sm font-medium text-accent hover:underline">
                Free video splitter — no watermark
              </Link>
            </li>
            <li>
              <Link to="/split-video-for-youtube-shorts" className="text-sm font-medium text-accent hover:underline">
                Split video for YouTube Shorts
              </Link>
            </li>
            <li>
              <Link to="/split-video-for-instagram-reels" className="text-sm font-medium text-accent hover:underline">
                Split video for Instagram Reels
              </Link>
            </li>
            <li>
              <Link to="/split-video-for-whatsapp-status" className="text-sm font-medium text-accent hover:underline">
                Split video for WhatsApp Status
              </Link>
            </li>
            <li>
              <Link to="/split-video-on-phone" className="text-sm font-medium text-accent hover:underline">
                Split video on your phone — iPhone & Android
              </Link>
            </li>
            <li>
              <Link to="/split-large-video-files" className="text-sm font-medium text-accent hover:underline">
                Splitting very large video files — 15 GB case study
              </Link>
            </li>
            <li>
              <Link to="/video-splitter-troubleshooting" className="text-sm font-medium text-accent hover:underline">
                Video splitter troubleshooting
              </Link>
            </li>
            <li>
              <Link to="/video-splitter-faq" className="text-sm font-medium text-accent hover:underline">
                Video splitter FAQ
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>
            © {new Date().getFullYear()} SplitVideo.in · Contact:{" "}
            <a href="mailto:build@splitvideo.in" className="hover:text-foreground">
              build@splitvideo.in
            </a>
          </p>
            <a
              href="https://www.linkedin.com/company/splitvideo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit shrink-0 items-center gap-1.5 self-start rounded-md border border-border/60 bg-foreground/5 px-2 py-0.5 text-xs font-medium text-muted transition-colors hover:border-border hover:bg-foreground/10 hover:text-foreground"
              aria-label="SplitVideo on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 shrink-0"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          <nav aria-label="Footer">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a className="hover:text-foreground" href="#how-it-works">
                How it works
              </a>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
              <Link to="/video-splitter-faq" className="hover:text-foreground">
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
