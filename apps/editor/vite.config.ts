import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/*
 * `bun run dev:prod` sets this to point local dev at the production D1 database — reads and
 * writes both. Opt-in per invocation, never the default: plain `bun run dev` stays on
 * miniflare's local copy. Requires `wrangler login`, and expects the remote schema to be
 * current (`bun run db:migrate:remote`).
 */
const remoteDatabase = Boolean(process.env.BUTTERCREAM_REMOTE_DB);

export default defineConfig({
  optimizeDeps: {
    include: ["@base-ui/react/alert-dialog", "@base-ui/react/dialog"],
  },
  plugins: [
    cloudflare({
      inspectorPort: false,
      viteEnvironment: { name: "ssr" },
      ...(remoteDatabase
        ? {
            config: (config) => ({
              d1_databases: config.d1_databases?.map((database) => ({
                ...database,
                remote: true,
              })),
            }),
            remoteBindings: true,
          }
        : {}),
    }),
    tailwindcss(),
    tanstackStart(),
    react(),
  ],
  ssr: {
    optimizeDeps: {
      include: ["@base-ui/react/alert-dialog", "@base-ui/react/dialog"],
    },
  },
});
