import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Specimen } from "./preview-specimen.tsx";

describe("Specimen", () => {
  test("accepts page source without a surrounding source provider", () => {
    const markup = renderToStaticMarkup(
      <Specimen label="Application" source="export function Application() {}">
        <p>page preview</p>
      </Specimen>,
    );

    expect(markup).toContain('aria-label="Application view"');
    expect(markup).toContain('role="tab"');
    expect(markup).toContain(">Code</button>");
  });
});
