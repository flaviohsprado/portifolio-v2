import { Desktop } from "@/components/layout/Desktop";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/desktop")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Desktop />
}
