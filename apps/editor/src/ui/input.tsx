import { Input as BaseInput } from "@base-ui/react/input";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type InputVariant = "primary" | "secondary";

export interface InputProps extends Omit<BaseInput.Props, "className"> {
  className?: string;
  fullWidth?: boolean;
  variant?: InputVariant;
}

const VARIANTS: Record<InputVariant, string> = {
  primary: "bg-raised ring-1 ring-fg/12 ring-inset",
  secondary: "bg-transparent ring-0",
};

export function Input({
  className,
  fullWidth = false,
  variant = "primary",
  ...props
}: InputProps): ReactElement {
  return (
    <BaseInput
      className={classes(
        "h-8.5 rounded-(--radius-shell) px-2.5 text-base text-fg sm:text-sm",
        "placeholder:text-muted/70",
        "focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-fg",
        "disabled:opacity-45",
        VARIANTS[variant],
        fullWidth && "w-full",
        className,
      )}
      data-slot="input"
      {...props}
    />
  );
}
