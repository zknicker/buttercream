"use client";

import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type SpinnerColor = "current" | "accent" | "danger" | "success" | "warning";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  className?: string;
  color?: SpinnerColor;
  /** Announced to assistive technology. Set to null inside an already-labelled control. */
  label?: string | null;
  size?: SpinnerSize;
}

/*
 * Eight rather than the usual twelve: at the small size a bar is only a couple of pixels, and
 * twelve of them close up into a grey ring instead of reading as separate spokes.
 */
const BAR_COUNT = 8;

/* Fixed angles; the travelling effect comes from the stagger, not from rotating anything. */
const BARS = Array.from({ length: BAR_COUNT }, (_, index) => ({
  angle: index * (360 / BAR_COUNT),
  /* A negative delay starts the bar partway through its fade, so the ring is never blank. */
  delay: `calc(var(--bc-spinner-duration) / ${BAR_COUNT} * -${BAR_COUNT - index})`,
}));

export function Spinner({
  className,
  color = "current",
  label = "Loading",
  size = "md",
}: SpinnerProps): ReactElement {
  return (
    <span
      className={classes(
        "spinner",
        `spinner--${color}`,
        size !== "md" && `spinner--${size}`,
        className,
      )}
      data-slot="spinner"
      role={label === null ? undefined : "status"}
    >
      <span aria-hidden className="spinner__bars" data-slot="spinner-bars">
        {BARS.map((bar) => (
          <span
            className="spinner__bar"
            key={bar.angle}
            style={{
              animationDelay: bar.delay,
              transform: `rotate(${bar.angle}deg) translate(142%)`,
            }}
          />
        ))}
      </span>
      {label === null ? null : <span className="spinner__label">{label}</span>}
    </span>
  );
}
