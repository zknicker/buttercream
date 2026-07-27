"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export type SkeletonAnimation = "shimmer" | "pulse" | "none";

export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  animation?: SkeletonAnimation;
}

/**
 * A placeholder for content that has not arrived. Hidden from assistive technology: a screen
 * reader should hear the loading state from the region that owns it, not from every grey box.
 *
 * Nesting skeletons is supported — the outermost one sweeps for the whole group.
 */
export function Skeleton({
  animation = "shimmer",
  className,
  ...props
}: SkeletonProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={classes("skeleton", animation !== "none" && `skeleton--${animation}`, className)}
      data-slot="skeleton"
      {...props}
    />
  );
}
