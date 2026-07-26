import type { ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * The cupcake is drawn on a 16x17 pixel grid and rendered as hard-edged rects so it
 * stays aliased at any size. Never replace this with a smoothed vector or a raster.
 */
const PIXELS = {
  D: "#e07ba3",
  L: "#f7c5d7",
  M: "#ef9dba",
  O: "#4a3529",
  R: "#e0212a",
  S: "#8a5a2b",
  W: "#eaa94f",
  r: "#b3151d",
  w: "#d38f38",
} as const;

type PixelKey = keyof typeof PIXELS;

const GRID = [
  "............OO..",
  "..........OO....",
  ".........OO.....",
  ".......ORRRO....",
  "......ORRRRRO...",
  "......ORRrrRO...",
  "....OLLLORrOLLLO",
  "...OLLLLLLLLLLLO",
  "..OLLLMLLLLLMLLO",
  "..OLMMMLLMMLMMDO",
  "..OMMMMDDMMDDDDO",
  "...OOSSSSSSSSOO.",
  "...OWwWwWwWwWO..",
  "...OWwWwWwWwWO..",
  "....OWwWwWwWO...",
  "....OWwWwWwWO...",
  ".....OOOOOOO....",
] as const;

const COLUMNS = 16;
const ROWS = GRID.length;

/** Flattened once at module scope — the art is static, so this never needs recomputing. */
const RECTS = GRID.flatMap((row, y) =>
  [...row].flatMap((key, x) =>
    key === "." ? [] : [{ fill: PIXELS[key as PixelKey], id: `${x}-${y}`, x, y }],
  ),
);

export interface CupcakeMarkProps {
  className?: string;
  size?: number;
}

export function CupcakeMark({ className, size = 24 }: CupcakeMarkProps): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={classes("shrink-0", className)}
      data-pixel=""
      height={(size / COLUMNS) * ROWS}
      shapeRendering="crispEdges"
      viewBox={`0 0 ${COLUMNS} ${ROWS}`}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {RECTS.map((rect) => (
        <rect fill={rect.fill} height={1} key={rect.id} width={1} x={rect.x} y={rect.y} />
      ))}
    </svg>
  );
}

export interface LogoProps {
  className?: string;
  size?: number;
}

/** The locked-up mark and wordmark. Identical everywhere it appears. */
export function Logo({ className, size = 22 }: LogoProps): ReactElement {
  return (
    <span className={classes("flex items-center gap-2", className)}>
      <CupcakeMark size={size} />
      <span className="font-mono text-ink lowercase tracking-tight">buttercream</span>
    </span>
  );
}
