"use client";

import type { ComponentPropsWithoutRef, CSSProperties, ReactElement } from "react";
import { classes } from "./classes.ts";

export type ColorSwatchShape = "square" | "circle";

export type ColorSwatchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ColorSwatchProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  /** Any CSS colour. Translucent values show the checkerboard behind them. */
  color: string;
  /** Announced in place of the raw value, which reads poorly aloud. */
  label?: string;
  shape?: ColorSwatchShape;
  size?: ColorSwatchSize;
}

/** A colour sample. Presentational, so it takes no Base UI primitive. */
export function ColorSwatch({
  className,
  color,
  label,
  shape = "square",
  size = "md",
  style,
  ...props
}: ColorSwatchProps): ReactElement {
  return (
    <span
      aria-label={label ?? color}
      className={classes(
        "color-swatch",
        `color-swatch--${shape}`,
        size !== "md" && `color-swatch--${size}`,
        className,
      )}
      data-slot="color-swatch"
      role="img"
      style={{ ...style, "--bc-color-swatch": color } as CSSProperties}
      {...props}
    />
  );
}
