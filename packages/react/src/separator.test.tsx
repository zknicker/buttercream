import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Separator } from "./separator.tsx";

describe("Separator", () => {
  test("renders a single horizontal rule by default", () => {
    const markup = renderToStaticMarkup(<Separator />);

    expect(markup).toContain('data-slot="separator"');
    expect(markup).toContain("separator--horizontal");
    expect(markup).toContain("separator--default");
    expect(markup).not.toContain("separator__container");
  });

  test("applies orientation and variant", () => {
    const markup = renderToStaticMarkup(<Separator orientation="vertical" variant="secondary" />);

    expect(markup).toContain("separator--vertical");
    expect(markup).toContain("separator--secondary");
    expect(markup).toContain('aria-orientation="vertical"');
  });

  test("splits into two rules around a label", () => {
    const markup = renderToStaticMarkup(<Separator>or</Separator>);

    expect(markup).toContain("separator__container--horizontal");
    expect(markup).toContain("separator__content");
    expect(markup).toContain("or");
    /* Both halves carry the separator role; the wrapper stays presentational. */
    expect([...markup.matchAll(/separator__line/gu)]).toHaveLength(2);
  });
});
