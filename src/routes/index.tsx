import { createFileRoute } from "@tanstack/react-router";
import { SplitterApp } from "@/components/splitter-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SplitterApp />;
}
