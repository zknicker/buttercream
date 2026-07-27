"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type TextareaVariant = "primary" | "secondary";

export interface TextareaProps extends Omit<BaseInput.Props, "className" | "render"> {
  className?: string;
  fullWidth?: boolean;
  rows?: number;
  variant?: TextareaVariant;
}

/**
 * A multi-line field. Base UI has no textarea primitive; its Input carries the field wiring and
 * renders whatever element it is given, so this is Input rendered as a `<textarea>` rather than
 * a hand-rolled control that would miss the validation plumbing.
 */
export function Textarea({
  className,
  fullWidth = false,
  rows = 3,
  variant = "primary",
  ...props
}: TextareaProps): ReactElement {
  return (
    <BaseInput
      className={classes(
        "textarea",
        variant === "secondary" && "textarea--secondary",
        fullWidth && "textarea--full-width",
        className,
      )}
      data-slot="textarea"
      render={<textarea rows={rows} />}
      {...props}
    />
  );
}
