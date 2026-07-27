import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Fieldset } from "./fieldset.tsx";

describe("Fieldset", () => {
  test("renders a native fieldset with a legend and its layout slots", () => {
    const markup = renderToStaticMarkup(
      <Fieldset>
        <Fieldset.Legend>Billing address</Fieldset.Legend>
        <Fieldset.Group>
          <span>Street</span>
          <span>City</span>
        </Fieldset.Group>
        <Fieldset.Actions>
          <button type="button">Save</button>
        </Fieldset.Actions>
      </Fieldset>,
    );

    expect(markup).toContain("<fieldset");
    expect(markup).toContain("<legend");
    expect(markup).toContain("fieldset__legend");
    expect(markup).toContain("fieldset__field-group");
    expect(markup).toContain("fieldset__actions");
  });
});
