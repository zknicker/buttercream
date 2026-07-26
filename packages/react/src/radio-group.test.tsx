import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { RadioGroup } from "./radio-group.tsx";

describe("RadioGroup", () => {
  test("renders a labelled Base UI group with Buttercream items", () => {
    const markup = renderToStaticMarkup(
      <RadioGroup
        defaultValue="pro"
        description="Choose the plan that suits you best"
        label="Plan selection"
        name="plan"
        orientation="horizontal"
        variant="secondary"
      >
        <RadioGroup.Item description="For side projects" value="starter">
          Starter
        </RadioGroup.Item>
        <RadioGroup.Item description="Advanced reporting" value="pro">
          Pro
        </RadioGroup.Item>
      </RadioGroup>,
    );

    expect(markup).toContain('data-slot="radio-group"');
    expect(markup).toContain("radio-group--horizontal");
    expect(markup).toContain("radio-group--secondary");
    expect(markup).toContain('data-checked=""');
    expect(markup).toContain('name="plan"');
    expect(markup).toContain("Choose the plan that suits you best");
  });
});
