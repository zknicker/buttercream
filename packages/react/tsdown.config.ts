import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ["react", "react-dom"],
  },
  dts: true,
  entry: ["src/index.ts", "src/avatar.tsx", "src/button.tsx", "src/card.tsx"],
  format: ["esm"],
});
