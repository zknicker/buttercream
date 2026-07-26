import type { ReactElement } from "react";
import { classes } from "../ui/index.ts";

/*
 * Pixel glyphs are drawn on the same 12x12 grid as the mark so the whole system shares
 * one pixel density. Hard rects only — no strokes, no curves.
 */
const GLYPHS = {
  caret: [
    "............",
    "..XX........",
    "...XX.......",
    "....XX......",
    ".....XX.....",
    "....XX......",
    "...XX.......",
    "..XX........",
    "............",
    "....XXXXXX..",
    "....XXXXXX..",
    "............",
  ],
  swatch: [
    "............",
    ".XXXXXXXX...",
    ".X......X...",
    ".X......X...",
    ".XXXXXXXX...",
    "..XXXXXXXX..",
    "..X......X..",
    "..X......X..",
    "..XXXXXXXX..",
    "...XXXXXXXX.",
    "...X......X.",
    "...XXXXXXXX.",
  ],
  whisk: [
    ".....XX.....",
    ".....XX.....",
    ".....XX.....",
    "....XXXX....",
    "...X.XX.X...",
    "..X..XX..X..",
    "..X..XX..X..",
    ".X...XX...X.",
    ".X..XXXX..X.",
    ".X.XX..XX.X.",
    "..XX....XX..",
    "...XXXXXX...",
  ],
} as const;

export interface Feature {
  body: string;
  glyph: keyof typeof GLYPHS;
  title: string;
}

/** Flattened once at module scope — the glyphs are static. */
const GLYPH_RECTS = Object.fromEntries(
  Object.entries(GLYPHS).map(([name, grid]) => [
    name,
    grid.flatMap((row, y) =>
      [...row].flatMap((cell, x) => (cell === "X" ? [{ id: `${x}-${y}`, x, y }] : [])),
    ),
  ]),
) as Record<keyof typeof GLYPHS, Array<{ id: string; x: number; y: number }>>;

function PixelGlyph({ name }: { name: keyof typeof GLYPHS }): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-8 shrink-0 text-fg"
      data-pixel=""
      shapeRendering="crispEdges"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      {GLYPH_RECTS[name].map((rect) => (
        <rect fill="currentColor" height={1} key={rect.id} width={1} x={rect.x} y={rect.y} />
      ))}
    </svg>
  );
}

export function FeatureRow({
  className,
  features,
}: {
  className?: string;
  features: readonly Feature[];
}): ReactElement {
  return (
    <ul className={classes("grid gap-10 sm:grid-cols-3 sm:gap-8", className)} role="list">
      {features.map((feature) => (
        <li key={feature.title}>
          <PixelGlyph name={feature.glyph} />
          <h3 className="mt-4 font-display text-xl text-fg">{feature.title}</h3>
          <p className="mt-2 max-w-[48ch] text-base text-pretty text-muted sm:text-sm">
            {feature.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
