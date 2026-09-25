import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SplitVideo.in" },
      {
        name: "description",
        content:
          "Privacy Policy for SplitVideo.in. Video processing happens on your device. Information about cookies, Google AdSense, and how we handle data.",
      },
      { property: "og:title", content: "Privacy Policy — SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/privacy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Privacy Policy">
      <p className="text-foreground">
        Last updated: 25 September 2026
      </p>

      <p>
        SplitVideo.in (“we”, “us”, or “the site”) provides a free, browser-based
        video splitting tool. This Privacy Policy explains what information is
        collected, how it is used, and your choices.
      </p>

      <h2 className="text-xl font-semibold text-foreground">1. Video files and processing</h2>
      <p>
        When you use the video splitter, the selected video file is processed
        entirely in your browser on your own device. The original video is{" "}
        <strong>not uploaded</strong> to our servers for splitting or encoding.
        We do not receive, store, or have access to the content of the videos
        you choose to process.
      </p>

      <h2 className="text-xl font-semibold text-foreground">2. Information we may collect</h2>
      <p>We may collect limited technical and usage information, including:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Standard server logs (IP address, browser type, referring URL, timestamps)</li>
        <li>Anonymous analytics data about page views and site performance (for example via Vercel Analytics)</li>
        <li>Information necessary to operate and secure the website</li>
      </ul>
      <p>
        We do not require an account to use the tool, and we do not collect
        personal information such as name or address solely for the purpose of
        using the splitter.
      </p>

      <h2 className="text-xl font-semibold text-foreground">3. Cookies and similar technologies</h2>
      <p>
        The site may use cookies and similar technologies for essential
        functionality, analytics, and advertising.
      </p>
      <p>
        <strong>Google AdSense / advertising cookies:</strong> We use Google
        AdSense to display ads. Google and its partners may use cookies (including
        the DoubleClick cookie) to serve ads based on your prior visits to this
        and other websites. You can opt out of personalized advertising by
        visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google’s Ads Settings
        </a>{" "}
        or by visiting{" "}
        <a
          href="https://www.aboutads.info/choices/"
          className="text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.aboutads.info
        </a>
        .
      </p>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on
        a user’s prior visits to this website or other websites. Google’s use of
        advertising cookies enables it and its partners to serve ads based on
        visits to this site and/or other sites on the Internet.
      </p>

      <h2 className="text-xl font-semibold text-foreground">4. How we use information</h2>
      <p>We use collected information to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Operate, maintain, and improve the website and tool</li>
        <li>Understand aggregate usage patterns</li>
        <li>Display relevant advertising (via AdSense)</li>
        <li>Protect against abuse and ensure security</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">5. Data sharing</h2>
      <p>
        We do not sell personal information. Limited data may be processed by
        service providers that help us run the site (hosting, analytics,
        advertising). These providers are bound by their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold text-foreground">6. Children’s privacy</h2>
      <p>
        The site is not directed at children under 13 (or the applicable age in
        your jurisdiction). We do not knowingly collect personal information from
        children.
      </p>

      <h2 className="text-xl font-semibold text-foreground">7. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated”
        date at the top will reflect the latest version. Continued use of the
        site after changes constitutes acceptance of the updated policy.
      </p>

      <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
      <p>
        Questions about this Privacy Policy can be sent to{" "}
        <a href="mailto:build@splitvideo.in" className="text-accent hover:underline">
          build@splitvideo.in
        </a>
        .
      </p>

      <p className="pt-4">
        <Link to="/" className="text-accent hover:underline">
          ← Back to SplitVideo
        </Link>
      </p>
    </SeoPageLayout>
  );
}
