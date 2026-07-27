"use client";

import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type ProgressCircleColor = "default" | "accent" | "success" | "warning" | "danger";

export type ProgressCircleSize = "sm" | "md" | "lg";

export interface ProgressCircleProps extends Omit<BaseProgress.Root.Props, "className"> {
  className?: string;
  color?: ProgressCircleColor;
  size?: ProgressCircleSize;
}

/*
 * The geometry is fixed in user units and scaled by the SVG's box, so one viewBox serves every
 * size. RADIUS is inset from the 18-unit centre by half the stroke, keeping the ring inside its
 * own bounds instead of clipping at the edges.
 */
const CENTRE = 18;
const RADIUS = 16;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** The visible arc while indeterminate — a quarter turn, long enough to read as motion. */
const INDETERMINATE_OFFSET = CIRCUMFERENCE * 0.75;

/**
 * A ring reporting progress. Same semantics as ProgressBar — `value={null}` is indeterminate,
 * which drops `aria-valuenow` and lets the stylesheet spin the ring off that absence.
 */
export function ProgressCircle({
  className,
  color = "default",
  size = "md",
  value,
  ...props
}: ProgressCircleProps): ReactElement {
  const max = typeof props.max === "number" ? props.max : 100;
  const min = typeof props.min === "number" ? props.min : 0;
  const indeterminate = value === null || value === undefined;

  /* Clamped so a value outside the range cannot draw an arc longer than the ring. */
  const ratio = indeterminate ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  const dashOffset = indeterminate ? INDETERMINATE_OFFSET : CIRCUMFERENCE * (1 - ratio);

  return (
    <BaseProgress.Root
      className={classes(
        "progress-circle",
        color !== "default" && `progress-circle--${color}`,
        size !== "md" && `progress-circle--${size}`,
        className,
      )}
      data-slot="progress-circle"
      value={value}
      {...props}
    >
      {/* The ring is decorative; the root already carries the progressbar role and its value. */}
      <svg
        aria-hidden="true"
        className="progress-circle__track"
        data-slot="progress-circle-track"
        fill="none"
        role="presentation"
        viewBox={`0 0 ${CENTRE * 2} ${CENTRE * 2}`}
      >
        <circle
          className="progress-circle__track-circle"
          cx={CENTRE}
          cy={CENTRE}
          data-slot="progress-circle-track-circle"
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          className="progress-circle__fill-circle"
          cx={CENTRE}
          cy={CENTRE}
          data-slot="progress-circle-fill-circle"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={STROKE_WIDTH}
        />
      </svg>
    </BaseProgress.Root>
  );
}
