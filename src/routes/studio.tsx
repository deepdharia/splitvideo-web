import { createFileRoute } from "@tanstack/react-router";
import { PaidAccess } from "@/components/paid-access";
export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [{ title: "Studio | SplitVideo" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => <PaidAccess studio />,
});
