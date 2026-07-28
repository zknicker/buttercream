import { type ReactElement, useId } from "react";
import { classes } from "./classes.ts";

/*
 * The signature accent: an ordered-dither divider drawn with a 4x4 Bayer matrix.
 *
 * Two rules make it read as printed stipple rather than a CSS opacity fade:
 *
 * 1. Density is continuous per row, not stepped. Each row compares its own density
 *    against the Bayer threshold for that cell, so the texture dissolves smoothly
 *    instead of banding into visible tiers.
 * 2. Unlit cells are drawn in the same color at a lower alpha rather than left
 *    transparent. Varying opacity of one color — instead of punching holes or
 *    mixing in lighter shades — is what keeps the band legible on both light and
 *    dark backgrounds. A shade tuned for parchment reads as a bright speck on ink.
 *
 * Implemented as one SVG pattern per row: every row has a single density, so a row
 * needs exactly one 4x4 tile. That keeps it server-renderable and dependency-free.
 */

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((value) => (value + 0.5) / 16));

/** Alpha of an unlit cell relative to a lit one. */
const OFF_TIER = 0.4;

export interface DitherBandProps {
  className?: string;
  /**
   * Hold every row at one density (0–1) instead of fading. Turns the band into an even field of
   * stipple — a rule rather than a transition — and `direction` stops applying.
   *
   * A fading band also carries its visual weight at the solid end, so it never looks vertically
   * centred beside text no matter where the box sits. An even field does.
   */
  density?: number;
  /** "down" is solid at the top dissolving downward; "up" reverses it. */
  direction?: "down" | "up";
  /** Band height in px. Rounded to a whole number of dither cells. */
  height?: number;
  /** Edge length of one dither cell, in px. */
  pixel?: number;
}

export function DitherBand({
  className,
  density: fixedDensity,
  direction = "down",
  height = 40,
  pixel = 2,
}: DitherBandProps): ReactElement {
  const id = useId();
  const rowCount = Math.max(2, Math.round(height / pixel));
  const tile = pixel * 4;
  const total = rowCount * pixel;

  const rows = Array.from({ length: rowCount }, (_, index) => {
    const progress = index / (rowCount - 1);
    const density = fixedDensity ?? (direction === "down" ? 1 - progress : progress);
    const base = 0.3 + density * 0.7;

    return {
      cells: (BAYER_4X4[index % 4] ?? []).map((threshold, column) => ({
        /*
         * Density drives both which cells light up and how strongly, so a fading band fades on
         * two axes at once. Held constant, the second axis would only scale the whole field down
         * uniformly — so an even band skips it and lets the caller set the level with the text
         * colour instead.
         */
        opacity:
          fixedDensity === undefined
            ? (density > threshold ? base : base * OFF_TIER) * density
            : density > threshold
              ? 1
              : OFF_TIER,
        x: column * pixel,
        key: `${id}-${index}-${column}`,
      })),
      key: `${id}-${index}`,
      y: index * pixel,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={classes("w-full overflow-hidden", className)}
      data-pixel=""
      style={{ height: total }}
    >
      <svg
        aria-hidden="true"
        height={total}
        preserveAspectRatio="xMinYMin slice"
        shapeRendering="crispEdges"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {rows.map((row) => (
            <pattern
              height={pixel}
              id={row.key}
              key={row.key}
              patternUnits="userSpaceOnUse"
              width={tile}
            >
              {row.cells.map((cell) => (
                <rect
                  fill="currentColor"
                  fillOpacity={cell.opacity}
                  height={pixel}
                  key={cell.key}
                  width={pixel}
                  x={cell.x}
                  y={0}
                />
              ))}
            </pattern>
          ))}
        </defs>
        {rows.map((row) => (
          <rect
            fill={`url(#${row.key})`}
            height={pixel}
            key={row.key}
            width="100%"
            x={0}
            y={row.y}
          />
        ))}
      </svg>
    </div>
  );
}
