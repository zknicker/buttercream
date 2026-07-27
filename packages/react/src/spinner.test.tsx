import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Spinner } from "./spinner.tsx";

describe("Spinner", () => {
  test("renders the default size without a size modifier", () => {
    const markup = renderToStaticMarkup(<Spinner />);

    expect(markup).toContain('data-slot="spinner"');
    expect(markup).toContain("spinner--current");
    expect(markup).not.toContain("spinner--md");
    expect(markup).toContain('role="status"');
    expect(markup).toContain("Loading");
  });

  test("applies size and colour variants", () => {
    const markup = renderToStaticMarkup(<Spinner color="danger" size="xl" />);

    expect(markup).toContain("spinner--danger");
    expect(markup).toContain("spinner--xl");
  });

  test("drops the status role and label when the label is cleared", () => {
    const markup = renderToStaticMarkup(<Spinner label={null} />);

    /* Inside an already-labelled control a second status would be announced twice. */
    expect(markup).not.toContain('role="status"');
    expect(markup).not.toContain("Loading");
  });

  test("lays the bars out evenly around the circle", () => {
    const markup = renderToStaticMarkup(<Spinner />);
    const angles = [...markup.matchAll(/rotate\((\d+)deg\)/gu)].map((match) => Number(match[1]));

    expect(angles).toEqual([0, 45, 90, 135, 180, 225, 270, 315]);
  });

  test("staggers every bar by a distinct negative delay", () => {
    const markup = renderToStaticMarkup(<Spinner />);
    const delays = [...markup.matchAll(/animation-delay:([^;"]+)/gu)].map(
      (match) => match[1] ?? "",
    );

    /*
     * A repeated delay would leave two bars at identical opacity and break the sense of travel,
     * and a positive one would start the ring blank.
     */
    expect(delays).toHaveLength(8);
    expect(new Set(delays).size).toBe(8);
    expect(delays.every((delay) => delay.includes("-"))).toBe(true);
  });
});
