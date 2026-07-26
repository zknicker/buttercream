import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Popover } from "./popover.tsx";

describe("Popover", () => {
  test("renders a styled Base UI trigger", () => {
    const markup = renderToStaticMarkup(
      <Popover>
        <Popover.Trigger className="custom-trigger">Open</Popover.Trigger>
        <Popover.Content arrow>
          <Popover.Title>Shortcuts</Popover.Title>
          <Popover.Description>Jump anywhere.</Popover.Description>
        </Popover.Content>
      </Popover>,
    );

    expect(markup).toContain('data-slot="popover-trigger"');
    expect(markup).toContain('class="popover__trigger custom-trigger"');
    expect(markup).toContain('aria-haspopup="dialog"');
    expect(markup).toContain(">Open</button>");
  });
});
