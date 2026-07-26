import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["@base-ui/react/alert-dialog", "@base-ui/react/dialog"],
  },
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), tanstackStart(), react()],
  ssr: {
    optimizeDeps: {
      include: ["@base-ui/react/alert-dialog", "@base-ui/react/dialog"],
    },
  },
});
