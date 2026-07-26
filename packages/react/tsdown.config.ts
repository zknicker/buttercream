import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ["react", "react-dom"],
  },
  dts: true,
  entry: [
    "src/index.ts",
    "src/avatar.tsx",
    "src/button.tsx",
    "src/card.tsx",
    "src/checkbox.tsx",
    "src/input.tsx",
    "src/radio-group.tsx",
    "src/select.tsx",
    "src/slider.tsx",
    "src/surface.tsx",
    "src/switch.tsx",
    "src/tabs.tsx",
  ],
  format: ["esm"],
});
