"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<BaseButton.Props, "className"> {
  className?: string;
  fullWidth?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  iconOnly = false,
  loading = false,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps): ReactElement {
  return (
    <BaseButton
      aria-busy={loading || undefined}
      className={classes(
        "button",
        `button--${variant}`,
        size !== "md" && `button--${size}`,
        fullWidth && "button--full-width",
        iconOnly && "button--icon-only",
        className,
      )}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      {...props}
    >
      {children}
      {loading ? <span aria-hidden className="button__spinner" /> : null}
    </BaseButton>
  );
}
