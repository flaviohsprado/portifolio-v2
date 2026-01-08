import { db } from "@portifolio-v2/db";
import * as schema from "@portifolio-v2/db/schema/auth";
import { env } from "@portifolio-v2/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
});
