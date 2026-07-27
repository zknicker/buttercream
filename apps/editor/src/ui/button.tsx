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

/*
 * Butter and berry are saturated in both themes, so their labels stay the fixed brand
 * ink/parchment rather than flipping with the canvas.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  danger: "bg-berry text-parchment hover:bg-berry/90 dark:text-ink",
  "danger-soft": "bg-berry/15 text-berry hover:bg-berry/25",
  ghost: "text-muted hover:bg-fg/8 hover:text-fg",
  outline: "bg-raised text-fg ring-1 ring-fg/12 ring-inset hover:bg-sunken",
  primary: "bg-butter text-ink hover:bg-butter/88",
  secondary: "bg-sunken text-fg ring-1 ring-fg/8 ring-inset hover:bg-fg/8",
  tertiary: "bg-fg/5 text-fg hover:bg-fg/10",
};

const SIZES: Record<ButtonSize, string> = {
  lg: "h-11 gap-2 text-base",
  md: "h-8.5 gap-2 text-sm",
  sm: "h-7 gap-1.5 text-sm",
};

/*
 * Padding and the icon-only width are kept apart from SIZES on purpose. Emitting
 * `px-2.5` and `px-0` together lets Tailwind's property ordering decide the winner,
 * which silently crushed icon-only buttons to a few pixels of content width.
 */
const PADDING: Record<ButtonSize, string> = {
  lg: "px-4",
  md: "px-3",
  sm: "px-2.5",
};

const ICON_ONLY_WIDTHS: Record<ButtonSize, string> = {
  lg: "w-11",
  md: "w-8.5",
  sm: "w-7",
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
        // Icons must never be squeezed by the flex row.
        "[&>svg]:shrink-0",
        "focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-fg",
        "disabled:pointer-events-none disabled:opacity-45 data-disabled:pointer-events-none data-disabled:opacity-45",
        VARIANTS[variant],
        SIZES[size],
        iconOnly ? ICON_ONLY_WIDTHS[size] : PADDING[size],
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
          className="absolute size-4 animate-spin rounded-full border-2 border-current border-r-transparent text-fg"
        />
      ) : null}
    </BaseButton>
  );
}
