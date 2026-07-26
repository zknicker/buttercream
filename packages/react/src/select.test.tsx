import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Select } from "./select.tsx";

describe("Select", () => {
  test("renders a labelled Base UI select with Buttercream items", () => {
    const markup = renderToStaticMarkup(
      <Select
        defaultValue="florida"
        description="Select your state of residence"
        items={[
          { label: "Florida", value: "florida" },
          { label: "Delaware", value: "delaware" },
        ]}
        label="State"
        name="state"
        placeholder="Select one"
      >
        <Select.Item value="florida">Florida</Select.Item>
        <Select.Item value="delaware">Delaware</Select.Item>
      </Select>,
    );

    expect(markup).toContain('data-slot="select"');
    expect(markup).toContain('data-slot="select-trigger"');
    expect(markup).toContain('name="state"');
    expect(markup).toContain("Florida");
    expect(markup).toContain("Select your state of residence");
  });
});
