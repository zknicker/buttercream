import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Slider } from "./slider.tsx";

describe("Slider", () => {
  test("renders a labelled range with one thumb per value", () => {
    const markup = renderToStaticMarkup(
      <Slider
        defaultValue={[100, 500]}
        format={{ currency: "USD", style: "currency" }}
        label="Price"
        max={1000}
        name="price"
        thumbLabels={["Minimum price", "Maximum price"]}
      />,
    );

    expect(markup).toContain('data-slot="slider"');
    expect(markup).toContain('data-slot="slider-label"');
    expect(markup).toContain('data-slot="slider-value"');
    expect(markup).toContain("Minimum price");
    expect(markup).toContain("Maximum price");
    expect(markup.match(/type="range"/gu)).toHaveLength(2);
  });
});
