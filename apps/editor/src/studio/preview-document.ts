import { type DesignSystem, exportGlobalCss } from "@buttercream/theme-core";
import { type PreviewSection, renderPreviewSection } from "./preview-sections.ts";

interface PreviewDocumentOptions {
  componentCss: string;
  designSystem: DesignSystem;
  section: PreviewSection;
  theme: "light" | "dark";
}

export function createPreviewDocument({
  componentCss,
  designSystem,
  section,
  theme,
}: PreviewDocumentOptions): string {
  const themeOverrides = exportGlobalCss(designSystem).replace(/^@import.*$/gmu, "");

  return `<!doctype html>
<html data-theme="${theme}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      ${componentCss}
      ${themeOverrides}
      html, body { margin: 0; min-height: 100%; background: var(--background); color: var(--foreground); }
      body { padding: 32px; font-family: var(--font-sans); }
      .specimens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
      .specimen { min-height: 260px; display: flex; flex-wrap: wrap; align-content: center; align-items: center; justify-content: center; gap: 16px; border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; }
      .specimen__label { width: 100%; align-self: flex-end; color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .input-demo { display: grid; width: min(100%, 15rem); gap: 16px; }
      .input-demo--types { gap: 12px; }
      .input-field { display: grid; gap: 6px; }
      .input-field__label { color: var(--foreground); font-size: 14px; font-weight: 500; }
      .input-field__helper { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 12px; }
      .surface-demo { width: min(100%, 22rem); padding: 40px; border-radius: var(--radius); }
      .control-stack { display: grid; gap: 20px; }
      .control-status { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .swatch { min-height: 180px; padding: 20px; border-radius: var(--radius); font-weight: 700; }
      @media (max-width: 800px) { .specimens, .guide-grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    ${renderPreviewSection(section)}
  </body>
</html>`;
}
