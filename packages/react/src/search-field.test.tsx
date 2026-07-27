import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchField } from "./search-field.tsx";

describe("SearchField", () => {
  test("renders a search input with an icon and a clear button", () => {
    const markup = renderToStaticMarkup(<SearchField placeholder="Search..." />);

    expect(markup).toContain('data-slot="search-field"');
    expect(markup).toContain('data-slot="search-field-icon"');
    expect(markup).toContain('type="search"');
    expect(markup).toContain("search-field__clear");
    expect(markup).toContain('aria-label="Clear search"');
  });

  test("marks itself empty so the clear button can hide", () => {
    const empty = renderToStaticMarkup(<SearchField />);
    const filled = renderToStaticMarkup(<SearchField defaultValue="shoes" />);

    expect(empty).toContain('data-empty="true"');
    expect(filled).not.toContain("data-empty");
  });

  test("takes the clear button out of the tab order while empty", () => {
    const empty = renderToStaticMarkup(<SearchField />);

    /* An invisible button that still catches Tab is a dead stop for keyboard users. */
    expect(empty).toContain('tabindex="-1"');
  });

  test("treats a controlled value as the source of truth", () => {
    const markup = renderToStaticMarkup(<SearchField onChange={() => {}} value="boots" />);

    expect(markup).toContain('value="boots"');
    expect(markup).not.toContain("data-empty");
  });
});
