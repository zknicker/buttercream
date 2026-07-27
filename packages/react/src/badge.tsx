"use client";

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type BadgeColor = "default" | "accent" | "success" | "warning" | "danger";

export type BadgeVariant = "primary" | "soft";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface BadgeProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  color?: BadgeColor;
  /** Hangs the badge off a corner of `anchor` instead of rendering it inline. */
  placement?: BadgePlacement;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

export interface BadgeAnchorProps extends ComponentPropsWithoutRef<"span"> {
  /** The badge to hang off this element's corner. */
  badge: ReactNode;
}

/** A count or status marker. Purely presentational, so no Base UI primitive is involved. */
function BadgeRoot({
  children,
  className,
  color = "default",
  placement,
  size = "md",
  variant = "primary",
  ...props
}: BadgeProps): ReactElement {
  return (
    <span
      className={classes(
        "badge",
        `badge--${color}`,
        `badge--${variant}`,
        size !== "md" && `badge--${size}`,
        placement && `badge--${placement}`,
        className,
      )}
      data-slot="badge"
      {...props}
    >
      <span className="badge__label" data-slot="badge-label">
        {children}
      </span>
    </span>
  );
}

/**
 * Positions a badge against whatever it marks. The anchor owns the containing block, so the
 * badge can hang outside its bounds without the caller needing a stacking context of its own.
 */
function BadgeAnchor({ badge, children, className, ...props }: BadgeAnchorProps): ReactElement {
  return (
    <span className={classes("badge-anchor", className)} data-slot="badge-anchor" {...props}>
      {children}
      {badge}
    </span>
  );
}

export const Badge = Object.assign(BadgeRoot, {
  Anchor: BadgeAnchor,
});
