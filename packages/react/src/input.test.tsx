import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "./input.tsx";

describe("Input", () => {
  test("renders variant and layout classes", () => {
    const markup = renderToStaticMarkup(
      <Input aria-label="Email" fullWidth name="email" variant="secondary" />,
    );

    expect(markup).toContain('data-slot="input"');
    expect(markup).toContain("input--secondary");
    expect(markup).toContain("input--full-width");
    expect(markup).toContain('name="email"');
  });
});
