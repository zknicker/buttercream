"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type InputVariant = "primary" | "secondary";

export interface InputProps extends Omit<BaseInput.Props, "className" | "prefix"> {
  className?: string;
  fullWidth?: boolean;
  prefix?: ReactNode;
  variant?: InputVariant;
}

export function Input({
  className,
  fullWidth = false,
  prefix,
  variant = "primary",
  ...props
}: InputProps): ReactElement {
  return (
    <span
      className={classes(
        "input",
        variant === "secondary" && "input--secondary",
        fullWidth && "input--full-width",
        className,
      )}
      data-slot="input"
    >
      {prefix === undefined ? null : (
        <span className="input__prefix" data-slot="input-prefix">
          {prefix}
        </span>
      )}
      <BaseInput className="input__input" data-slot="input-input" {...props} />
    </span>
  );
}
