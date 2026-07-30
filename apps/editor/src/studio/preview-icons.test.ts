import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem, type HugeiconsTreatment } from "@buttercream/theme-core";
import { renderToStaticMarkup } from "react-dom/server";
import { createPreviewIconElements } from "./preview-icons.ts";
import { renderPreviewSection } from "./preview-sections.tsx";

const hugeiconsTreatments: HugeiconsTreatment[] = [
  "stroke-rounded",
  "stroke-sharp",
  "stroke-standard",
  "solid-rounded",
  "solid-sharp",
  "solid-standard",
  "bulk-rounded",
  "duotone-rounded",
  "duotone-standard",
  "twotone-rounded",
];

describe("preview icons", () => {
  test("renders Lucide with the configured size and stroke width", () => {
    const icons = createPreviewIconElements({
      family: "lucide",
      size: 18,
      strokeWidth: 1.5,
      treatment: "stroke",
    });
    const search = renderToStaticMarkup(icons.search);

    expect(Object.keys(icons)).toHaveLength(58);
    expect(search).toContain('class="lucide lucide-search preview-icon"');
    expect(search).toContain('width="18"');
    expect(search).toContain('stroke-width="1.5"');
  });

  test("resolves every supported Hugeicons treatment", () => {
    const rendered = hugeiconsTreatments.map((treatment) =>
      createPreviewIconElements({
        family: "hugeicons",
        size: 20,
        strokeWidth: 2,
        treatment,
      }),
    );

    for (const icons of rendered) {
      expect(Object.keys(icons)).toHaveLength(58);
      const search = renderToStaticMarkup(icons.search);
      expect(search).toContain('class="preview-icon"');
      expect(search).toContain('width="20"');
    }
  });

  test("projects the selected family into the preview markup", () => {
    const designSystem = createDefaultDesignSystem();
    designSystem.icons = {
      family: "lucide",
      size: 17,
      strokeWidth: 1.75,
      treatment: "stroke",
    };

    const markup = renderToStaticMarkup(
      renderPreviewSection("Button", { designSystem, surfaceStyle: {}, theme: "light" }),
    );

    expect(markup).toContain('class="lucide lucide-search preview-icon"');
    expect(markup).toContain('width="17"');
    expect(markup).toContain('stroke-width="1.75"');
  });
});
