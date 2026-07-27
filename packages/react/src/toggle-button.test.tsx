import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ToggleButton } from "./toggle-button.tsx";

describe("ToggleButton", () => {
  test("renders the default variant without a size modifier", () => {
    const markup = renderToStaticMarkup(<ToggleButton>Bold</ToggleButton>);

    expect(markup).toContain('data-slot="toggle-button"');
    expect(markup).toContain("toggle-button--default");
    expect(markup).not.toContain("toggle-button--md");
    expect(markup).toContain('aria-pressed="false"');
  });

  test("reports the on state through the Base UI pressed attribute", () => {
    const markup = renderToStaticMarkup(<ToggleButton pressed>Bold</ToggleButton>);

    /* The stylesheet keys the selected treatment off data-pressed, not a data-selected of ours. */
    expect(markup).toContain('data-pressed=""');
    expect(markup).toContain('aria-pressed="true"');
  });

  test("applies the ghost, size, and icon-only modifiers", () => {
    const markup = renderToStaticMarkup(
      <ToggleButton iconOnly size="sm" variant="ghost">
        <svg />
      </ToggleButton>,
    );

    expect(markup).toContain("toggle-button--ghost");
    expect(markup).toContain("toggle-button--sm");
    expect(markup).toContain("toggle-button--icon-only");
  });

  test("groups toggles with an orientation", () => {
    const markup = renderToStaticMarkup(
      <ToggleButton.Group orientation="vertical">
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
      </ToggleButton.Group>,
    );

    expect(markup).toContain('data-slot="toggle-button-group"');
    expect(markup).toContain("toggle-button-group--vertical");
  });
});
