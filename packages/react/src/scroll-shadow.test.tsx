import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ScrollShadow } from "./scroll-shadow.tsx";

describe("ScrollShadow", () => {
  test("renders a plain scroll container with no fade before measurement", () => {
    const markup = renderToStaticMarkup(
      <ScrollShadow>
        <p>Row</p>
      </ScrollShadow>,
    );

    expect(markup).toContain('class="scroll-shadow"');
    expect(markup).toContain('data-slot="scroll-shadow"');
    /* The edges are measured on the client; the server never guesses a shadow. */
    expect(markup).not.toContain("data-shadow");
  });

  test("hideScrollBar and orientation project as modifiers", () => {
    const markup = renderToStaticMarkup(
      <ScrollShadow hideScrollBar orientation="horizontal">
        <p>Row</p>
      </ScrollShadow>,
    );

    expect(markup).toContain("scroll-shadow--hide-scrollbar");
    expect(markup).toContain("scroll-shadow--horizontal");
  });
});
