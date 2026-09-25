import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SplitVideo.in" },
      {
        name: "description",
        content:
          "Contact SplitVideo.in. Reach us at build@splitvideo.in for questions, feedback, or support related to the free on-device video splitter.",
      },
      { property: "og:title", content: "Contact — SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Contact">
      <p className="text-foreground">
        We’d like to hear from you.
      </p>

      <div className="glass rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-foreground">Email</h2>
        <p className="mt-2">
          <a
            href="mailto:build@splitvideo.in"
            className="text-accent hover:underline text-base font-medium"
          >
            build@splitvideo.in
          </a>
        </p>
        <p className="mt-3 text-sm">
          Use this address for questions about the tool, feedback, privacy
          inquiries, or anything else related to SplitVideo.in.
        </p>
      </div>

      <h2 className="text-xl font-semibold text-foreground">Response time</h2>
      <p>
        We aim to reply within a few days. For the fastest help with using the
        splitter, check the{" "}
        <Link to="/video-splitter-faq" className="text-accent hover:underline">
          FAQ
        </Link>{" "}
        and the how-to guides linked from the homepage.
      </p>

      <h2 className="text-xl font-semibold text-foreground">Related pages</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/about" className="text-accent hover:underline">
            About SplitVideo
          </Link>
        </li>
        <li>
          <Link to="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>
        </li>
      </ul>

      <p className="pt-4">
        <Link to="/" className="text-accent hover:underline">
          ← Back to the tool
        </Link>
      </p>
    </SeoPageLayout>
  );
}
