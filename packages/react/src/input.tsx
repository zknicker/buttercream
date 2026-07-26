"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type InputVariant = "primary" | "secondary";

export interface InputProps extends Omit<BaseInput.Props, "className"> {
  className?: string;
  fullWidth?: boolean;
  variant?: InputVariant;
}

export function Input({
  className,
  fullWidth = false,
  variant = "primary",
  ...props
}: InputProps): ReactElement {
  return (
    <BaseInput
      className={classes(
        "input",
        variant === "secondary" && "input--secondary",
        fullWidth && "input--full-width",
        className,
      )}
      data-slot="input"
      {...props}
    />
  );
}
