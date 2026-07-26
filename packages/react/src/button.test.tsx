import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button.tsx";

describe("Button", () => {
  test("renders Buttercream variant and size classes", () => {
    const markup = renderToStaticMarkup(
      <Button size="lg" variant="danger">
        Delete
      </Button>,
    );

    expect(markup).toContain("button--danger");
    expect(markup).toContain("button--lg");
    expect(markup).toContain(">Delete<");
  });

  test("renders full width and loading states", () => {
    const markup = renderToStaticMarkup(
      <Button fullWidth loading variant="secondary">
        Save
      </Button>,
    );

    expect(markup).toContain("button--full-width");
    expect(markup).toContain("button--secondary");
    expect(markup).toContain('data-loading="true"');
    expect(markup).toContain("button__spinner");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('aria-disabled="true"');
  });
});
