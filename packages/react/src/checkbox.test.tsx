import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Checkbox } from "./checkbox.tsx";

describe("Checkbox", () => {
  test("renders Base UI state with Buttercream classes", () => {
    const markup = renderToStaticMarkup(
      <Checkbox
        defaultChecked
        description="Required for updates"
        name="updates"
        variant="secondary"
      >
        Product updates
      </Checkbox>,
    );

    expect(markup).toContain('data-slot="checkbox"');
    expect(markup).toContain("checkbox--secondary");
    expect(markup).toContain('data-checked=""');
    expect(markup).toContain('name="updates"');
    expect(markup).toContain("Required for updates");
  });
});
