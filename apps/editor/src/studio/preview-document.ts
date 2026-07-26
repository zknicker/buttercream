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
      .specimen--stack { flex-direction: column; flex-wrap: nowrap; }
      .specimen__label { width: 100%; align-self: flex-end; color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .preview-icon { flex: none; }
      .preview-card { width: min(100%, 23.375rem); }
      .preview-card-grid { display: grid; width: min(100%, 23.375rem); grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      .preview-card--horizontal { display: grid; grid-template-columns: 5rem minmax(0, 1fr) auto; align-items: start; }
      .preview-card__media { width: 5rem; height: 5rem; grid-row: span 2; border-radius: var(--form-radius); background: var(--accent-soft); }
      .preview-card__meta { display: grid; grid-column: 2; align-self: end; font-size: 12px; }
      .preview-card__meta span, .preview-byline { color: color-mix(in oklab, var(--foreground) 55%, transparent); }
      .preview-card-stack { display: grid; width: min(100%, 23.375rem); gap: 16px; }
      .preview-card--community { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; }
      .preview-byline { display: inline-flex; grid-column: 2; align-items: center; gap: 8px; font-size: 12px; }
      .preview-card__actions { justify-content: space-between; }
      .preview-login { display: grid; gap: 12px; }
      .input-demo { display: grid; width: min(100%, 15rem); gap: 16px; }
      .input-demo--types { gap: 12px; }
      .input-field { display: grid; gap: 6px; }
      .input-field__label { color: var(--foreground); font-size: 14px; font-weight: 500; }
      .input-field__helper { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 12px; }
      .surface-demo { width: min(100%, 22rem); padding: 40px; border-radius: var(--radius); }
      .control-stack { display: grid; gap: 20px; }
      .control-status { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .preview-tooltip, .preview-popover { position: relative; display: inline-flex; justify-content: center; }
      .preview-tooltip__overlay, .preview-popover__overlay { position: absolute; visibility: hidden; opacity: 0; pointer-events: none; }
      .preview-tooltip__overlay[data-side="top"], .preview-popover__overlay[data-side="top"] { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
      .preview-tooltip__overlay[data-side="right"], .preview-popover__overlay[data-side="right"] { top: 50%; left: calc(100% + 8px); transform: translateY(-50%); }
      .preview-tooltip__overlay[data-side="bottom"], .preview-popover__overlay[data-side="bottom"] { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
      .preview-tooltip__overlay[data-side="left"], .preview-popover__overlay[data-side="left"] { top: 50%; right: calc(100% + 8px); transform: translateY(-50%); }
      .preview-tooltip--offset .preview-tooltip__overlay[data-side="top"] { bottom: calc(100% + 16px); }
      .preview-tooltip__overlay[data-arrow]::after,
      .preview-popover__overlay[data-arrow]::before { position: absolute; left: 50%; width: 0; height: 0; border-right: 6px solid transparent; border-left: 6px solid transparent; content: ""; transform: translateX(-50%); }
      .preview-tooltip__overlay[data-arrow]::after { top: 100%; border-top: 6px solid var(--foreground); }
      .preview-popover__overlay[data-arrow]::before { bottom: 100%; border-bottom: 6px solid var(--card); filter: drop-shadow(0 0 1px var(--border)); }
      .preview-tooltip:hover .preview-tooltip__overlay,
      .preview-tooltip:focus-within .preview-tooltip__overlay,
      .preview-popover:focus-within .preview-popover__overlay { visibility: visible; opacity: 1; pointer-events: auto; }
      .preview-modal, .preview-drawer { display: inline-flex; }
      .preview-modal__overlay, .preview-drawer__overlay { width: auto; height: auto; margin: 0; padding: 0; border: 0; color: inherit; }
      .placement-cross { display: grid; grid-template: "blank top blank2" auto "left center right" auto "blank3 bottom blank4" auto / auto auto auto; align-items: center; justify-items: center; gap: 8px; }
      .placement-cross__top { grid-area: top; }
      .placement-cross__left { grid-area: left; }
      .placement-cross__center { grid-area: center; color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 13px; }
      .placement-cross__right { grid-area: right; }
      .placement-cross__bottom { grid-area: bottom; }
      .profile-trigger { display: flex; align-items: center; gap: 8px; padding: 0; border: 0; background: transparent; color: var(--foreground); font: inherit; text-align: left; cursor: pointer; }
      .profile-trigger > span:last-child, .profile-popover__header > span:nth-child(2) { display: grid; min-width: 0; }
      .profile-trigger strong, .profile-popover__header strong { font-size: 14px; font-weight: 500; }
      .profile-trigger small, .profile-popover__header small { color: color-mix(in oklab, var(--foreground) 55%, transparent); font-size: 12px; }
      .profile-popover { width: 280px; }
      .profile-popover__header { display: grid; min-width: 0; align-items: center; gap: 8px; grid-template-columns: auto minmax(0, 1fr) auto; }
      .profile-popover .popover__description { margin-top: 8px; }
      .guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .swatch { min-height: 180px; padding: 20px; border-radius: var(--radius); font-weight: 700; }
      @media (max-width: 800px) { .specimens, .guide-grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    ${renderPreviewSection(section, designSystem.icons)}
  </body>
</html>`;
}
