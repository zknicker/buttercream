"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export interface ErrorMessageProps extends ComponentPropsWithoutRef<"span"> {}

/**
 * An error that belongs to a form rather than to one control — a failed submission, a server
 * rejection. For a message tied to a single input, use `Field.Error`, which Base UI wires to
 * that input's `aria-describedby`.
 *
 * A span, matching the reference, so it can sit inline inside a paragraph or a field's footer.
 * Unlike the reference it carries `role="alert"`: a standalone error nothing points at would
 * otherwise appear silently, and the whole reason to render one is that it needs to be noticed.
 */
export function ErrorMessage({ className, ...props }: ErrorMessageProps): ReactElement {
  return (
    <span
      className={classes("error-message", className)}
      data-slot="error-message"
      role="alert"
      {...props}
    />
  );
}
