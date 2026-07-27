import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Meter } from "./meter.tsx";

describe("Meter", () => {
  test("renders track and fill with the meter role", () => {
    const markup = renderToStaticMarkup(<Meter value={62} />);

    expect(markup).toContain('data-slot="meter-track"');
    expect(markup).toContain('data-slot="meter-fill"');
    /* A meter is a reading, not a task — the role has to differ from progressbar. */
    expect(markup).toContain('role="meter"');
  });

  test("shows a label and value only when asked", () => {
    const bare = renderToStaticMarkup(<Meter value={62} />);
    const full = renderToStaticMarkup(<Meter label="Storage" showValue value={62} />);

    expect(bare).not.toContain('data-slot="meter-label"');
    expect(full).toContain("Storage");
    expect(full).toContain('data-slot="meter-output"');
  });

  test("applies colour and size modifiers", () => {
    const markup = renderToStaticMarkup(<Meter color="warning" size="sm" value={90} />);

    expect(markup).toContain("meter--warning");
    expect(markup).toContain("meter--sm");
  });
});
