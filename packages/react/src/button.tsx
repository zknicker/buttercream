"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ReactElement } from "react";
import { createContext, useContext } from "react";
import { classes } from "./classes.ts";
import { Spinner } from "./spinner.tsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonGroupContextValue {
  disabled?: boolean | undefined;
  size?: ButtonSize | undefined;
  variant?: ButtonVariant | undefined;
}

/**
 * Read by Button for its defaults, written by ButtonGroup. Empty by default so a Button
 * outside any group resolves exactly as it always has.
 */
export const ButtonGroupContext = createContext<ButtonGroupContextValue>({});

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
  size,
  variant,
  ...props
}: ButtonProps): ReactElement {
  // An enclosing ButtonGroup's variant/size/disabled are defaults, not overrides — an
  // explicit prop on this Button always wins.
  const group = useContext(ButtonGroupContext);
  const resolvedVariant = variant ?? group.variant ?? "primary";
  const resolvedSize = size ?? group.size ?? "md";
  const resolvedDisabled = disabled ?? group.disabled ?? false;

  return (
    <BaseButton
      aria-busy={loading || undefined}
      className={classes(
        "button",
        `button--${resolvedVariant}`,
        resolvedSize !== "md" && `button--${resolvedSize}`,
        fullWidth && "button--full-width",
        iconOnly && "button--icon-only",
        className,
      )}
      data-loading={loading || undefined}
      disabled={resolvedDisabled || loading}
      focusableWhenDisabled={loading}
      {...props}
    >
      {children}
      {/* The same Spinner the rest of the system uses, so a loading button cannot drift into
          being a second spinner with its own look and speed. */}
      {loading ? <Spinner className="button__spinner" label={null} size="sm" /> : null}
    </BaseButton>
  );
}
