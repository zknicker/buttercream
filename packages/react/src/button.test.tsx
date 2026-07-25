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
});
