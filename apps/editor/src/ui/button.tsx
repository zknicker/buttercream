import { Button as BaseButton } from "@base-ui/react/button";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * Shell kit. The prop surface deliberately mirrors @buttercream/react so that swapping
 * these out for the real components later is a mechanical import change. The styling
 * does not — the shell must never inherit the design system being edited.
 */

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
  iconOnly?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const VARIANTS: Record<ButtonVariant, string> = {
  danger: "bg-berry text-parchment hover:bg-berry/90",
  "danger-soft": "bg-berry/12 text-berry hover:bg-berry/20",
  ghost: "text-graphite hover:bg-ink/6 hover:text-ink",
  outline: "bg-parchment text-ink ring-1 ring-ink/12 ring-inset hover:bg-crumb",
  primary: "bg-butter text-ink hover:bg-butter/88",
  secondary: "bg-crumb text-ink ring-1 ring-ink/8 ring-inset hover:bg-ink/8",
  tertiary: "bg-ink/5 text-ink hover:bg-ink/10",
};

const SIZES: Record<ButtonSize, string> = {
  lg: "h-11 gap-2 px-4 text-base",
  md: "h-8.5 gap-2 px-3 text-sm",
  sm: "h-7 gap-1.5 px-2.5 text-sm",
};

const ICON_SIZES: Record<ButtonSize, string> = {
  lg: "w-11 px-0",
  md: "w-8.5 px-0",
  sm: "w-7 px-0",
};

export function Button({
  children,
  className,
  disabled,
  iconOnly = false,
  loading = false,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps): ReactElement {
  return (
    <BaseButton
      className={classes(
        "relative inline-flex shrink-0 items-center justify-center rounded-(--radius-shell) font-medium whitespace-nowrap",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        "disabled:pointer-events-none disabled:opacity-45 data-disabled:pointer-events-none data-disabled:opacity-45",
        VARIANTS[variant],
        SIZES[size],
        iconOnly && ICON_SIZES[size],
        loading && "text-transparent",
        className,
      )}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      {...props}
    >
      {children}
      {iconOnly ? (
        <span
          aria-hidden="true"
          className="pointer-fine:hidden absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2"
        />
      ) : null}
      {loading ? (
        <span
          aria-hidden="true"
          className="absolute size-4 animate-spin rounded-full border-2 border-current border-r-transparent text-ink"
        />
      ) : null}
    </BaseButton>
  );
}
