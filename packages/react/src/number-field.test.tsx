import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { NumberField } from "./number-field.tsx";

describe("NumberField", () => {
  test("renders the group, input, and both steppers", () => {
    const markup = renderToStaticMarkup(<NumberField defaultValue={3} />);

    expect(markup).toContain('data-slot="number-field-group"');
    expect(markup).toContain('data-slot="number-field-decrement"');
    expect(markup).toContain('data-slot="number-field-input"');
    expect(markup).toContain('data-slot="number-field-increment"');
  });

  test("labels the steppers for assistive technology", () => {
    const markup = renderToStaticMarkup(<NumberField />);

    /* The glyphs are a minus and plus sign, which screen readers do not announce usefully. */
    expect(markup).toContain('aria-label="Decrease"');
    expect(markup).toContain('aria-label="Increase"');
  });

  test("orders the steppers around the input", () => {
    const markup = renderToStaticMarkup(<NumberField />);
    const decrement = markup.indexOf("number-field__decrement");
    const input = markup.indexOf("number-field__input");
    const increment = markup.indexOf("number-field__increment");

    /* The grid places them by source order, so a swap here would silently flip the controls. */
    expect(decrement).toBeLessThan(input);
    expect(input).toBeLessThan(increment);
  });
});
