import { createFileRoute } from "@tanstack/react-router";
import { SplitterApp } from "@/components/splitter-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "SplitVideo — Free Online Video Splitter",
      },
      {
        name: "description",
        content:
          "Split videos into equal parts, time-based clips, ranges, or custom cut points in your browser. Your video stays on your device.",
      },
    ],
    links: [{ rel: "canonical", href: "https://splitvideo.in/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <SplitterApp />

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-5xl px-4 pb-6"
        aria-labelledby="how-it-works-title"
      >
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Video splitting, without the upload step
          </p>
          <h2 id="how-it-works-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Split a video online while keeping the file on your device
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            SplitVideo is a browser-based video splitter for people who need to turn
            one recording into smaller clips. Choose a range, divide the video into
            equal parts, create clips at a fixed interval, or add your own cut points.
            The processing runs in your browser rather than sending the original video
            to a remote upload service.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Split into equal parts</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Useful when a long recording needs a predictable number of pieces.
                Select <strong>Equal parts</strong>, choose the number of parts, and
                export the resulting clips.
              </p>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Create clips by time</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Use <strong>Every N sec</strong> to turn a longer video into repeated
                time-based clips, or use <strong>Range</strong> when you only need one
                section of a recording.
              </p>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Make custom cut points</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                For interviews, gameplay, tutorials, and other recordings, place
                cut points on the timeline and export separate pieces from them.
              </p>
            </article>
            <article className="rounded-2xl bg-foreground/5 p-5">
              <h3 className="text-base font-semibold">Use it on phone or desktop</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                SplitVideo works in modern mobile and desktop browsers. On supported
                devices, the system share sheet can be used to save or share exported
                clips.
              </p>
            </article>
          </div>
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
                publishing them to social platforms.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Gameplay and recordings</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Turn a long gameplay session, screen recording, or event recording
                into manageable clips without first uploading the source file.
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
            SplitVideo is designed around local browser processing. The tool reads the
            selected video on your device and creates the exported clips locally.
            There is no need to upload the original recording to a video-processing
            server. This is useful for personal recordings, private footage, and
            large files where uploading first would be inconvenient.
          </p>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto w-full max-w-5xl px-4 pb-10"
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
                No. The splitter is designed to process the selected file on your
                device in the browser.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Can I split a video into equal parts?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Yes. Choose <strong>Equal parts</strong> and set how many clips you
                want to create.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Can I split by seconds?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Yes. <strong>Every N sec</strong> creates time-based clips from the
                selected video.
              </p>
            </article>
            <article>
              <h3 className="font-semibold">Does splitting reduce video quality?</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                The default path is designed to avoid re-encoding. If you enable the
                H.264 option when your browser supports it, the video is re-encoded,
                which can take longer and may slightly reduce quality.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SplitVideo. All rights reserved.</p>
          <nav aria-label="Footer">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a className="hover:text-foreground" href="#how-it-works">How it works</a>
              <a className="hover:text-foreground" href="#use-cases">Use cases</a>
              <a className="hover:text-foreground" href="#privacy">Privacy</a>
              <a className="hover:text-foreground" href="#faq">FAQ</a>
            </div>
          </nav>
        </div>
      </footer>
    </>
  );
}
