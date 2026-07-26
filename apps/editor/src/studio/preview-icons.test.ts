import { describe, expect, test } from "bun:test";
import { createDefaultDesignSystem, type HugeiconsTreatment } from "@buttercream/theme-core";
import { createPreviewDocument } from "./preview-document.ts";
import { createPreviewIcons } from "./preview-icons.ts";

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
    const icons = createPreviewIcons({
      family: "lucide",
      size: 18,
      strokeWidth: 1.5,
      treatment: "stroke",
    });

    expect(Object.keys(icons)).toHaveLength(9);
    expect(icons.search).toContain('class="lucide lucide-search preview-icon"');
    expect(icons.search).toContain('width="18"');
    expect(icons.search).toContain('stroke-width="1.5"');
  });

  test("resolves every supported Hugeicons treatment", () => {
    const rendered = hugeiconsTreatments.map((treatment) =>
      createPreviewIcons({
        family: "hugeicons",
        size: 20,
        strokeWidth: 2,
        treatment,
      }),
    );

    for (const icons of rendered) {
      expect(Object.keys(icons)).toHaveLength(9);
      expect(icons.search).toContain('class="preview-icon"');
      expect(icons.search).toContain('width="20"');
    }
  });

  test("projects the selected family into the preview document", () => {
    const designSystem = createDefaultDesignSystem();
    designSystem.icons = {
      family: "lucide",
      size: 17,
      strokeWidth: 1.75,
      treatment: "stroke",
    };

    const document = createPreviewDocument({
      componentCss: "",
      designSystem,
      section: "Button",
      theme: "light",
    });

    expect(document).toContain('class="lucide lucide-search preview-icon"');
    expect(document).toContain('width="17"');
    expect(document).toContain('stroke-width="1.75"');
  });
});
