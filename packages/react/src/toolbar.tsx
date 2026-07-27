"use client";

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type ToolbarVariant = "plain" | "attached";

export interface ToolbarProps extends Omit<BaseToolbar.Root.Props, "className"> {
  className?: string;
  variant?: ToolbarVariant;
}

/**
 * A bar of related controls. Unlike ButtonGroup this genuinely is a toolbar: Base UI gives it
 * roving focus, so one Tab reaches the bar and the arrow keys move within it.
 */
function ToolbarRoot({
  className,
  orientation = "horizontal",
  variant = "plain",
  ...props
}: ToolbarProps): ReactElement {
  return (
    <BaseToolbar.Root
      className={classes(
        "toolbar",
        `toolbar--${orientation}`,
        variant !== "plain" && `toolbar--${variant}`,
        className,
      )}
      data-slot="toolbar"
      orientation={orientation}
      {...props}
    />
  );
}

function ToolbarGroup({
  className,
  ...props
}: Omit<BaseToolbar.Group.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseToolbar.Group
      className={classes("toolbar__group", className)}
      data-slot="toolbar-group"
      {...props}
    />
  );
}

/**
 * Uses the design system's separator classes so a divider in a toolbar matches one anywhere
 * else; toolbar.css only trims it to half height.
 */
function ToolbarSeparator({
  className,
  orientation = "vertical",
  ...props
}: Omit<BaseToolbar.Separator.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseToolbar.Separator
      className={classes("separator", `separator--${orientation}`, "separator--default", className)}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
}

export const Toolbar = Object.assign(ToolbarRoot, {
  Group: ToolbarGroup,
  Separator: ToolbarSeparator,
});
