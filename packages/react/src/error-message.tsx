"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { classes } from "./classes.ts";

export interface ErrorMessageProps extends ComponentPropsWithoutRef<"p"> {}

/**
 * An error that belongs to a form rather than to one control — a failed submission, a server
 * rejection. For a message tied to a single input, use `Field.Error`, which Base UI wires to
 * that input's `aria-describedby`.
 *
 * Announced politely: an error appearing after a submit is new information, but interrupting
 * whatever the user is reading to say so is not warranted.
 */
export function ErrorMessage({ className, ...props }: ErrorMessageProps): ReactElement {
  return (
    <p
      className={classes("error-message", className)}
      data-slot="error-message"
      role="alert"
      {...props}
    />
  );
}
