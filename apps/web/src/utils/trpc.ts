import type { AppRouter } from "@portifolio-v2/api/routers/index";

import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();
