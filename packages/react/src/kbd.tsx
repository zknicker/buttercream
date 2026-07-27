"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {}

/** A keyboard key or chord. Renders a native `<kbd>`, which already carries the semantics. */
export function Kbd({ className, ...props }: KbdProps): ReactElement {
  return <kbd className={classes("kbd", className)} data-slot="kbd" {...props} />;
}
