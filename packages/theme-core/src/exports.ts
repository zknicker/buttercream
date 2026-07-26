import { exportGlobalCss, importThemeCss } from "./css.ts";
import { type DesignSystem, designSystemSchema } from "./design-system.ts";
import { exportDesignGuidance } from "./guidance.ts";

export interface ProjectExport {
  content: string;
  filename: "DESIGN.md" | "buttercream.json" | "design-system.json" | "global.css";
  mediaType: "application/json" | "text/css" | "text/markdown";
}

export function exportDesignSystemJson(designSystem: DesignSystem): string {
  return `${JSON.stringify(designSystem, null, 2)}\n`;
}

export function importDesignSystemJson(source: string): DesignSystem {
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    throw new Error("The design-system JSON is not valid.");
  }

  const result = designSystemSchema.safeParse(value);
  if (!result.success) {
    throw new Error("The design-system JSON does not match the current Buttercream schema.");
  }
  return result.data;
}

export function importDesignSystemSource(source: string, current: DesignSystem): DesignSystem {
  const value = source.trim();
  if (!value) {
    throw new Error("Paste design-system JSON or global CSS to import.");
  }
  return value.startsWith("{") ? importDesignSystemJson(value) : importThemeCss(value, current);
}

export function createDesignSystemExports(
  designSystem: DesignSystem,
  designSystemUrl: string,
): ProjectExport[] {
  const manifest = {
    $schema: "https://buttercream.studio/schema.json",
    css: "src/styles/global.css",
    designSystem: designSystemUrl,
    guidance: "DESIGN.md",
  };

  return [
    {
      content: exportGlobalCss(designSystem),
      filename: "global.css",
      mediaType: "text/css",
    },
    {
      content: exportDesignGuidance(designSystem),
      filename: "DESIGN.md",
      mediaType: "text/markdown",
    },
    {
      content: `${JSON.stringify(manifest, null, 2)}\n`,
      filename: "buttercream.json",
      mediaType: "application/json",
    },
    {
      content: exportDesignSystemJson(designSystem),
      filename: "design-system.json",
      mediaType: "application/json",
    },
  ];
}
