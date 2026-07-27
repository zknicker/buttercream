"use client";

import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type MeterColor = "default" | "accent" | "success" | "warning" | "danger";

export type MeterSize = "sm" | "md" | "lg";

export interface MeterProps extends Omit<BaseMeter.Root.Props, "className"> {
  className?: string;
  color?: MeterColor;
  label?: ReactNode;
  showValue?: boolean;
  size?: MeterSize;
}

/**
 * A static reading within a known range — disk used, storage remaining. Where ProgressBar
 * reports a task moving toward completion, a meter reports a measurement, so it has no
 * indeterminate state.
 */
export function Meter({
  className,
  color = "default",
  label,
  showValue = false,
  size = "md",
  ...props
}: MeterProps): ReactElement {
  return (
    <BaseMeter.Root
      className={classes(
        "meter",
        color !== "default" && `meter--${color}`,
        size !== "md" && `meter--${size}`,
        className,
      )}
      data-slot="meter"
      {...props}
    >
      {label === undefined ? null : (
        <BaseMeter.Label className="meter__label" data-slot="meter-label">
          {label}
        </BaseMeter.Label>
      )}
      {showValue ? <BaseMeter.Value className="meter__output" data-slot="meter-output" /> : null}
      <BaseMeter.Track className="meter__track" data-slot="meter-track">
        <BaseMeter.Indicator className="meter__fill" data-slot="meter-fill" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
