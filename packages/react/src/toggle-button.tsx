"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type ToggleButtonSize = "sm" | "md" | "lg";

export type ToggleButtonVariant = "default" | "ghost";

export interface ToggleButtonProps extends Omit<BaseToggle.Props, "className"> {
  className?: string;
  iconOnly?: boolean;
  size?: ToggleButtonSize;
  variant?: ToggleButtonVariant;
}

/**
 * A button that stays on once pressed. Base UI reports the on state as `data-pressed`, which
 * is what the stylesheet keys the selected treatment off.
 */
function ToggleButtonRoot({
  className,
  iconOnly = false,
  size = "md",
  variant = "default",
  ...props
}: ToggleButtonProps): ReactElement {
  return (
    <BaseToggle
      className={classes(
        "toggle-button",
        `toggle-button--${variant}`,
        size !== "md" && `toggle-button--${size}`,
        iconOnly && "toggle-button--icon-only",
        className,
      )}
      data-slot="toggle-button"
      {...props}
    />
  );
}

export type ToggleButtonGroupOrientation = "horizontal" | "vertical";

export interface ToggleButtonGroupProps extends Omit<BaseToggleGroup.Props, "className"> {
  className?: string;
  orientation?: ToggleButtonGroupOrientation;
}

function ToggleButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ToggleButtonGroupProps): ReactElement {
  return (
    <BaseToggleGroup
      className={classes("toggle-button-group", `toggle-button-group--${orientation}`, className)}
      data-slot="toggle-button-group"
      orientation={orientation}
      {...props}
    />
  );
}

export const ToggleButton = Object.assign(ToggleButtonRoot, {
  Group: ToggleButtonGroup,
});
