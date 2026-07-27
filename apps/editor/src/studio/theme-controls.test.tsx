import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { FontControl, fontOptions, SelectControl, ToggleControl } from "./theme-controls.tsx";
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

describe("ToggleControl", () => {
  test("renders a named switch bound to the value", () => {
    const markup = renderToStaticMarkup(
      <ToggleControl label="Vibrant palette" onChange={() => undefined} value={true} />,
    );

    expect(markup).toContain('role="switch"');
    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('name="vibrant-palette"');
    expect(markup).toContain("checked");
  });
});

describe("FontControl", () => {
  test("offers the curated stacks and selects the current one", () => {
    const inter = fontOptions.find((option) => option.label === "Inter");
    const markup = renderToStaticMarkup(
      <FontControl label="Body Font" onChange={() => undefined} value={inter?.value ?? ""} />,
    );

    expect(inter).toBeDefined();
    expect(markup).toContain("selected");
    expect(markup).not.toContain("Custom");
  });

  test("surfaces an unknown stack as Custom instead of misreporting", () => {
    const markup = renderToStaticMarkup(
      <FontControl label="Heading Font" onChange={() => undefined} value="Comic Sans MS" />,
    );

    expect(markup).toContain(">Custom<");
    expect(markup).toContain("Comic Sans MS");
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
