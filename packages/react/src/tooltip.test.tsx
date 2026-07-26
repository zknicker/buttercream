import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Tooltip } from "./tooltip.tsx";

describe("Tooltip", () => {
  test("renders a styled Base UI trigger", () => {
    const markup = renderToStaticMarkup(
      <Tooltip.Provider delay={300}>
        <Tooltip>
          <Tooltip.Trigger className="custom-trigger">Help</Tooltip.Trigger>
          <Tooltip.Content arrow>Helpful context</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>,
    );

    expect(markup).toContain('data-slot="tooltip-trigger"');
    expect(markup).toContain('class="tooltip__trigger custom-trigger"');
    expect(markup).toContain(">Help</button>");
  });
});
