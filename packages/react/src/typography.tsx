"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactElement } from "react";
import { classes } from "./classes.ts";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-sm"
  | "body-xs"
  | "code";

export interface TypographyProps extends ComponentPropsWithoutRef<"p"> {
  /** Overrides the element without changing the style — for a heading that must not be an h1. */
  as?: ElementType;
  variant?: TypographyVariant;
}

/*
 * Each variant has one element that is right most of the time. Heading level is a document
 * concern rather than a visual one, though, so `as` exists to break the pairing when the
 * outline demands it — styling an h3 like an h1 should not cost you the heading order.
 */
const ELEMENTS: Record<TypographyVariant, ElementType> = {
  body: "p",
  "body-sm": "p",
  "body-xs": "p",
  code: "code",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

/** Applies the design system's type scale. */
export function Typography({
  as,
  className,
  variant = "body",
  ...props
}: TypographyProps): ReactElement {
  const Component = as ?? ELEMENTS[variant];

  return (
    <Component
      className={classes("typography", `typography--${variant}`, className)}
      data-slot="typography"
      {...props}
    />
  );
}
