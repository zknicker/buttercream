import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { PreviewSurface } from "./preview-surface.tsx";

/*
 * Custom CSS containment. The studio renders one surface, so a prelude that matches every
 * surface in the document looks correct there and only misbehaves once a page renders many
 * — which the design-systems index does. These assert the containment directly.
 */

describe("PreviewSurface custom CSS", () => {
  test("scopes to the instance rather than to every preview surface", () => {
    const markup = renderToStaticMarkup(
      <PreviewSurface customCss=".preview-card { color: red; }" style={{}} theme="light">
        <p>specimen</p>
      </PreviewSurface>,
    );

    expect(markup).not.toContain("@scope (.preview-surface)");
    expect(markup).toMatch(/@scope \(\[data-surface-scope="[a-zA-Z0-9]+"\]\)/u);
  });

  test("gives sibling surfaces different scopes", () => {
    const markup = renderToStaticMarkup(
      <>
        <PreviewSurface customCss=".preview-card { color: red; }" style={{}} theme="light">
          <p>one</p>
        </PreviewSurface>
        <PreviewSurface customCss=".preview-card { color: blue; }" style={{}} theme="dark">
          <p>two</p>
        </PreviewSurface>
      </>,
    );

    /* Each surface prints its scope twice — once as the attribute, once in the prelude. */
    const scopes = new Set(
      [...markup.matchAll(/data-surface-scope="([a-zA-Z0-9]+)"/gu)].map((match) => match[1]),
    );

    expect(scopes.size).toBe(2);
  });

  test("matches the scope selector to the element it is rendered inside", () => {
    const markup = renderToStaticMarkup(
      <PreviewSurface customCss=".preview-card { color: red; }" style={{}} theme="light">
        <p>specimen</p>
      </PreviewSurface>,
    );

    const attribute = /data-surface-scope="([a-zA-Z0-9]+)"/u.exec(markup)?.[1];
    expect(attribute).toBeDefined();
    expect(markup).toContain(`@scope ([data-surface-scope="${attribute}"])`);
  });

  test("emits no style element when the system has no custom CSS", () => {
    const markup = renderToStaticMarkup(
      <PreviewSurface customCss="   " style={{}} theme="light">
        <p>specimen</p>
      </PreviewSurface>,
    );

    expect(markup).not.toContain("<style");
  });

  test("marks a fullscreen surface as edge-to-edge", () => {
    const markup = renderToStaticMarkup(
      <PreviewSurface fullscreen customCss="" style={{}} theme="light">
        <p>app preview</p>
      </PreviewSurface>,
    );

    expect(markup).toContain("preview-surface--fullscreen");
  });
});
