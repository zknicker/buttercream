"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type CloseButtonVariant = "default";

export interface CloseButtonProps extends Omit<BaseButton.Props, "className"> {
  className?: string;
  /** Announced in place of the glyph, which is decorative. */
  label?: string;
  variant?: CloseButtonVariant;
}

/**
 * A small round dismiss control — the clear affordance in a search field, the corner of a
 * dialog. Base UI has no close-button primitive, so this is its Button with a built-in glyph;
 * passing children replaces the glyph.
 */
export function CloseButton({
  children,
  className,
  label = "Close",
  variant = "default",
  ...props
}: CloseButtonProps): ReactElement {
  return (
    <BaseButton
      aria-label={label}
      className={classes("close-button", `close-button--${variant}`, className)}
      data-slot="close-button"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          data-slot="close-button-icon"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4 4 12M4 4l8 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      )}
    </BaseButton>
  );
}
