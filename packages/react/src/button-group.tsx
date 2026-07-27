"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
  fullWidth?: boolean;
  orientation?: ButtonGroupOrientation;
}

/**
 * Joins buttons into one control.
 *
 * Carries no ARIA role of its own: the buttons inside are already labelled and actionable, and
 * a `group` with no accessible name announces nothing useful. Pass `role="group"` together with
 * an `aria-label` when the set genuinely needs naming — and reach for `ToggleButton.Group` when
 * the buttons express a selection rather than a row of separate actions, since that carries the
 * roving-focus behaviour this does not.
 */
export function ButtonGroup({
  className,
  fullWidth = false,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps): ReactElement {
  return (
    <div
      className={classes(
        "button-group",
        `button-group--${orientation}`,
        fullWidth && "button-group--full-width",
        className,
      )}
      data-orientation={orientation}
      data-slot="button-group"
      {...props}
    />
  );
}
