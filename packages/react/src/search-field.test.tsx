import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SearchField } from "./search-field.tsx";

function renderSearchField(
  props: Parameters<typeof SearchField>[0] = { children: null },
  inputProps: Parameters<typeof SearchField.Input>[0] = {},
) {
  return renderToStaticMarkup(
    <SearchField {...props}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="Search..." {...inputProps} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>,
  );
}

describe("SearchField", () => {
  test("renders a search input with an icon and a clear button", () => {
    const markup = renderSearchField();

    expect(markup).toContain('data-slot="search-field"');
    expect(markup).toContain('data-slot="search-field-group"');
    expect(markup).toContain('data-slot="search-field-icon"');
    expect(markup).toContain('type="search"');
    expect(markup).toContain("search-field__clear");
    expect(markup).toContain('aria-label="Clear search"');
  });

  test("marks the group empty so the clear button can hide", () => {
    const empty = renderSearchField();
    const filled = renderSearchField({ children: null, defaultValue: "shoes" });

    expect(empty).toContain('data-empty="true"');
    expect(filled).not.toContain("data-empty");
  });

  test("takes the clear button out of the tab order while empty", () => {
    const empty = renderSearchField();

    /* An invisible button that still catches Tab is a dead stop for keyboard users. */
    expect(empty).toContain('tabindex="-1"');
  });

  test("treats a controlled value as the source of truth", () => {
    const markup = renderSearchField({ children: null, value: "boots" }, { onChange: () => {} });

    expect(markup).toContain('value="boots"');
    expect(markup).not.toContain("data-empty");
  });

  test("throws when a part renders outside a SearchField", () => {
    expect(() => renderToStaticMarkup(<SearchField.Input placeholder="Search..." />)).toThrow(
      "SearchField.Input must be rendered inside a SearchField.",
    );
  });
});
