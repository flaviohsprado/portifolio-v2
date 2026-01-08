import { createContext } from "@portifolio-v2/api/context";
import { appRouter } from "@portifolio-v2/api/routers/index";
import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: appRouter,
    createContext,
    endpoint: "/api/trpc",
  });
}

export const Route = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
});
