import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/seo-page-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SplitVideo.in" },
      {
        name: "description",
        content:
          "Terms of Service for SplitVideo.in, the free on-device browser video splitter.",
      },
      { property: "og:title", content: "Terms of Service — SplitVideo.in" },
      { property: "og:url", content: "https://www.splitvideo.in/terms" },
    ],
    links: [{ rel: "canonical", href: "https://www.splitvideo.in/terms" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoPageLayout title="Terms of Service">
      <p className="text-foreground">
        Last updated: 25 September 2026
      </p>

      <p>
        By using SplitVideo.in (the “Service”), you agree to these Terms of
        Service. If you do not agree, please do not use the Service.
      </p>

      <h2 className="text-xl font-semibold text-foreground">1. The Service</h2>
      <p>
        SplitVideo.in provides a free, browser-based tool that allows you to
        split video files into parts (equal parts, time intervals, ranges, or
        custom cut points). Processing is performed in your browser on your
        device. We do not upload or store the original video files you select
        for splitting.
      </p>

      <h2 className="text-xl font-semibold text-foreground">2. Eligibility</h2>
      <p>
        You must be at least 18 years old (or the age of majority in your
        jurisdiction) to use the Service, or have permission from a parent or
        guardian where required.
      </p>

      <h2 className="text-xl font-semibold text-foreground">3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Use the Service for any unlawful purpose</li>
        <li>Attempt to disrupt, overload, or interfere with the Service</li>
        <li>Use automated means to abuse the Service or generate artificial traffic</li>
        <li>Misrepresent the Service or encourage others to click ads artificially</li>
      </ul>
      <p>
        You are solely responsible for the content of the video files you
        process and for ensuring you have the rights to process and distribute
        any resulting clips.
      </p>

      <h2 className="text-xl font-semibold text-foreground">4. No warranty</h2>
      <p>
        The Service is provided “as is” and “as available” without warranties of
        any kind, express or implied. We do not guarantee that the Service will
        be uninterrupted, error-free, or that every video format or device will
        work perfectly. Results depend on your browser, device, and the source
        file.
      </p>

      <h2 className="text-xl font-semibold text-foreground">5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, SplitVideo.in and its operators
        shall not be liable for any indirect, incidental, special, consequential,
        or punitive damages, or any loss of data, profits, or business, arising
        from your use of the Service.
      </p>

      <h2 className="text-xl font-semibold text-foreground">6. Intellectual property</h2>
      <p>
        The SplitVideo name, branding, and the software that powers the site are
        protected. You may not copy, reverse-engineer, or redistribute the
        Service except as permitted by applicable law. You retain all rights to
        the video files and clips you create with the tool.
      </p>

      <h2 className="text-xl font-semibold text-foreground">7. Advertising</h2>
      <p>
        The Service may display advertisements (including Google AdSense). Your
        use of the Service is also subject to the privacy practices described in
        our{" "}
        <Link to="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold text-foreground">8. Changes</h2>
      <p>
        We may update these Terms from time to time. The “Last updated” date
        will change when we do. Continued use after changes means you accept the
        revised Terms.
      </p>

      <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
      <p>
        Questions about these Terms:{" "}
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
