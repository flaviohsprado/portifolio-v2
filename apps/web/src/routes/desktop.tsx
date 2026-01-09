import { Desktop } from "@/components/layout/Desktop";
import { getUser } from "@/functions/get-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/desktop")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
});

function RouteComponent() {
  return <Desktop />
}
