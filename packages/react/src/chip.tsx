"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export type ChipColor = "default" | "accent" | "success" | "warning" | "danger";

export type ChipVariant = "primary" | "soft" | "tertiary";

export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  color?: ChipColor;
  size?: ChipSize;
  variant?: ChipVariant;
}

/** A compact label for a tag, category, or status. */
export function Chip({
  children,
  className,
  color = "default",
  size = "md",
  variant = "soft",
  ...props
}: ChipProps): ReactElement {
  return (
    <span
      className={classes(
        "chip",
        `chip--${color}`,
        `chip--${variant}`,
        size !== "md" && `chip--${size}`,
        className,
      )}
      data-slot="chip"
      {...props}
    >
      <span className="chip__label" data-slot="chip-label">
        {children}
      </span>
    </span>
  );
}
