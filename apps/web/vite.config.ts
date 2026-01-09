import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import alchemy from "alchemy/cloudflare/tanstack-start";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), viteReact(), alchemy()],
  server: {
    port: 3001,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  ssr: {
    noExternal: [
      "@trpc/tanstack-react-query",
      "@tanstack/react-query",
    ],
  },
});
