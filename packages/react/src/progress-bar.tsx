"use client";

import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type ProgressBarColor = "default" | "accent" | "success" | "warning" | "danger";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps extends Omit<BaseProgress.Root.Props, "className"> {
  className?: string;
  color?: ProgressBarColor;
  label?: ReactNode;
  /** Shows the percentage beside the label. */
  showValue?: boolean;
  size?: ProgressBarSize;
}

/**
 * A task advancing toward completion. Passing `value={null}` makes it indeterminate, which
 * drops `aria-valuenow` — the stylesheet keys the shuttle animation off that absence rather
 * than off a second flag that could disagree with it.
 */
export function ProgressBar({
  className,
  color = "default",
  label,
  showValue = false,
  size = "md",
  ...props
}: ProgressBarProps): ReactElement {
  return (
    <BaseProgress.Root
      className={classes(
        "progress-bar",
        color !== "default" && `progress-bar--${color}`,
        size !== "md" && `progress-bar--${size}`,
        className,
      )}
      data-slot="progress-bar"
      {...props}
    >
      {label === undefined ? null : (
        <BaseProgress.Label className="progress-bar__label" data-slot="progress-bar-label">
          {label}
        </BaseProgress.Label>
      )}
      {showValue ? (
        <BaseProgress.Value className="progress-bar__output" data-slot="progress-bar-output" />
      ) : null}
      <BaseProgress.Track className="progress-bar__track" data-slot="progress-bar-track">
        <BaseProgress.Indicator className="progress-bar__fill" data-slot="progress-bar-fill" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
