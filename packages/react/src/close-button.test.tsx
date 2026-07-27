import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CloseButton } from "./close-button.tsx";

describe("CloseButton", () => {
  test("renders a labelled button with a decorative glyph", () => {
    const markup = renderToStaticMarkup(<CloseButton />);

    expect(markup).toContain('data-slot="close-button"');
    expect(markup).toContain("close-button--default");
    /* The glyph carries no meaning, so the name has to come from the label. */
    expect(markup).toContain('aria-label="Close"');
    expect(markup).toContain('aria-hidden="true"');
  });

  test("takes a custom label", () => {
    const markup = renderToStaticMarkup(<CloseButton label="Dismiss notification" />);

    expect(markup).toContain('aria-label="Dismiss notification"');
  });

  test("lets children replace the built-in glyph", () => {
    const markup = renderToStaticMarkup(
      <CloseButton>
        <span>x</span>
      </CloseButton>,
    );

    expect(markup).toContain("<span>x</span>");
    expect(markup).not.toContain("close-button-icon");
  });
});
