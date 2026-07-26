import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Surface } from "./surface.tsx";

describe("Surface", () => {
  test("renders a semantic surface variant", () => {
    const markup = renderToStaticMarkup(<Surface variant="tertiary">Content</Surface>);

    expect(markup).toContain('data-slot="surface"');
    expect(markup).toContain("surface--tertiary");
    expect(markup).toContain(">Content<");
  });
});
