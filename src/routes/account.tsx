import { createFileRoute } from "@tanstack/react-router";
import { PaidAccess } from "@/components/paid-access";
export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account | SplitVideo" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <PaidAccess />,
});
