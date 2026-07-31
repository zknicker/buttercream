import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Segment } from "./segment.tsx";

describe("Segment", () => {
  test("marks the default value as pressed and sizes its items", () => {
    const markup = renderToStaticMarkup(
      <Segment defaultValue="general" size="sm">
        <Segment.Item value="general">General</Segment.Item>
        <Segment.Item value="guides">Guides</Segment.Item>
      </Segment>,
    );

    expect(markup).toContain('data-slot="segment"');
    expect(markup).toContain("segment--sm");
    expect(markup).toContain("segment__item--sm");
    expect(markup).toContain('data-pressed=""');
  });

  test("renders a pill and hairline on every item", () => {
    const markup = renderToStaticMarkup(
      <Segment defaultValue="a">
        <Segment.Item value="a">A</Segment.Item>
        <Segment.Item value="b">B</Segment.Item>
      </Segment>,
    );

    /* CSS reveals these off data-pressed, so an item must not need to know it is selected. */
    expect([...markup.matchAll(/segment__indicator/gu)]).toHaveLength(2);
    expect([...markup.matchAll(/segment__separator/gu)]).toHaveLength(2);
  });

  test("projects the label-display mode for the styles to read", () => {
    const markup = renderToStaticMarkup(
      <Segment defaultValue="home" showLabels="selected">
        <Segment.Item aria-label="Home" value="home">
          <svg aria-hidden="true" />
          <span>Home</span>
        </Segment.Item>
        <Segment.Item aria-label="Inbox" value="inbox">
          <svg aria-hidden="true" />
          <span>Inbox</span>
        </Segment.Item>
      </Segment>,
    );

    expect(markup).toContain('data-labels="selected"');
  });

  test("carries the ghost variant down to items", () => {
    const markup = renderToStaticMarkup(
      <Segment defaultValue="a" variant="ghost">
        <Segment.Item value="a">A</Segment.Item>
      </Segment>,
    );

    expect(markup).toContain("segment--ghost");
    expect(markup).toContain("segment__item--ghost");
    expect(markup).toContain("segment__indicator--ghost");
  });
});
