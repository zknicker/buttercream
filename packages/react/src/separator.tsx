"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorVariant = "default" | "secondary" | "tertiary";

/*
 * Props are plain div props rather than Base UI's, because a labelled separator puts them on a
 * wrapper div that cannot accept Base UI's function-valued className and style.
 */
export interface SeparatorProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Content set into the rule, which splits it into two halves either side of the label. */
  children?: ReactNode;
  className?: string;
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
}

export function Separator({
  children,
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorProps): ReactElement {
  const rule = (extra?: string) => (
    <BaseSeparator
      className={classes(
        "separator",
        `separator--${orientation}`,
        `separator--${variant}`,
        extra,
        children === undefined && className,
      )}
      data-slot="separator"
      orientation={orientation}
      {...(children === undefined ? props : {})}
    />
  );

  if (children === undefined) {
    return rule();
  }

  /*
   * A labelled separator is two rules with the label between them. Only the halves carry the
   * separator role; the wrapper is presentational so the label is not announced as a divider.
   */
  return (
    <div
      className={classes("separator__container", `separator__container--${orientation}`, className)}
      data-slot="separator-container"
      {...props}
    >
      {rule("separator__line")}
      <span
        className={classes("separator__content", `separator__content--${orientation}`)}
        data-slot="separator-content"
      >
        {children}
      </span>
      {rule("separator__line")}
    </div>
  );
}
