import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SelectControl } from "./theme-controls.tsx";
import {
  isStrokeBasedIconTreatment,
  normalizeIconFamily,
  ThemeIconControls,
} from "./theme-icon-controls.tsx";

describe("SelectControl", () => {
  test("renders a named native select with shell styling", () => {
    const markup = renderToStaticMarkup(
      <SelectControl
        label="Family"
        onChange={() => undefined}
        options={[
          { label: "Lucide", value: "lucide" },
          { label: "Hugeicons", value: "hugeicons" },
        ]}
        value="hugeicons"
      />,
    );

    expect(markup).toContain('aria-label="Family"');
    expect(markup).toContain('name="family"');
    expect(markup).toContain('value="hugeicons" selected=""');
    expect(markup).toContain('aria-hidden="true"');
  });
});

describe("icon controls", () => {
  test("normalizes treatment when the icon family changes", () => {
    const hugeicons = {
      family: "hugeicons",
      size: 20,
      strokeWidth: 1.5,
      treatment: "solid-rounded",
    } as const;

    expect(normalizeIconFamily(hugeicons, "lucide")).toEqual({
      family: "lucide",
      size: 20,
      strokeWidth: 1.5,
      treatment: "stroke",
    });
    expect(normalizeIconFamily(normalizeIconFamily(hugeicons, "lucide"), "hugeicons")).toEqual({
      family: "hugeicons",
      size: 20,
      strokeWidth: 1.5,
      treatment: "stroke-rounded",
    });
  });

  test("shows stroke width only for stroke-based treatments", () => {
    expect(
      isStrokeBasedIconTreatment({
        family: "lucide",
        size: 16,
        strokeWidth: 2,
        treatment: "stroke",
      }),
    ).toBe(true);
    expect(
      isStrokeBasedIconTreatment({
        family: "hugeicons",
        size: 16,
        strokeWidth: 2,
        treatment: "stroke-sharp",
      }),
    ).toBe(true);
    expect(
      isStrokeBasedIconTreatment({
        family: "hugeicons",
        size: 16,
        strokeWidth: 2,
        treatment: "solid-rounded",
      }),
    ).toBe(false);
  });

  test("conditionally renders the stroke-width control", () => {
    const strokeMarkup = renderToStaticMarkup(
      <ThemeIconControls
        icons={{
          family: "hugeicons",
          size: 16,
          strokeWidth: 2,
          treatment: "stroke-rounded",
        }}
        onChange={() => undefined}
      />,
    );
    const solidMarkup = renderToStaticMarkup(
      <ThemeIconControls
        icons={{
          family: "hugeicons",
          size: 16,
          strokeWidth: 2,
          treatment: "solid-rounded",
        }}
        onChange={() => undefined}
      />,
    );

    expect(strokeMarkup).toContain("Stroke width");
    expect(solidMarkup).not.toContain("Stroke width");
  });
});
