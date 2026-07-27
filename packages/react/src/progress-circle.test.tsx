import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProgressCircle } from "./progress-circle.tsx";

const CIRCUMFERENCE = 2 * Math.PI * 16;

function dashOffset(markup: string): number {
  return Number(/stroke-dashoffset="([\d.]+)"/u.exec(markup)?.[1]);
}

describe("ProgressCircle", () => {
  test("renders both rings inside one viewBox", () => {
    const markup = renderToStaticMarkup(<ProgressCircle value={65} />);

    expect(markup).toContain('viewBox="0 0 36 36"');
    expect(markup).toContain('data-slot="progress-circle-track-circle"');
    expect(markup).toContain('data-slot="progress-circle-fill-circle"');
    expect(markup).toContain('role="progressbar"');
  });

  test("maps value onto the arc", () => {
    /* Empty ring at 0, full at 100 — an inverted offset would draw the complement. */
    expect(dashOffset(renderToStaticMarkup(<ProgressCircle value={0} />))).toBeCloseTo(
      CIRCUMFERENCE,
      3,
    );
    expect(dashOffset(renderToStaticMarkup(<ProgressCircle value={100} />))).toBeCloseTo(0, 3);
    expect(dashOffset(renderToStaticMarkup(<ProgressCircle value={50} />))).toBeCloseTo(
      CIRCUMFERENCE / 2,
      3,
    );
  });

  test("honours a custom range", () => {
    const markup = renderToStaticMarkup(<ProgressCircle max={200} value={50} />);

    /* 50 of 200 is a quarter, not half — reading max is what makes this correct. */
    expect(dashOffset(markup)).toBeCloseTo(CIRCUMFERENCE * 0.75, 3);
  });

  test("clamps a value outside its range", () => {
    expect(dashOffset(renderToStaticMarkup(<ProgressCircle value={150} />))).toBeCloseTo(0, 3);
    expect(dashOffset(renderToStaticMarkup(<ProgressCircle value={-20} />))).toBeCloseTo(
      CIRCUMFERENCE,
      3,
    );
  });

  test("drops aria-valuenow when indeterminate", () => {
    const markup = renderToStaticMarkup(<ProgressCircle value={null} />);

    expect(markup).not.toContain("aria-valuenow");
    /* A visible arc remains, or the spin would have nothing to show. */
    expect(dashOffset(markup)).toBeCloseTo(CIRCUMFERENCE * 0.75, 3);
  });
});
