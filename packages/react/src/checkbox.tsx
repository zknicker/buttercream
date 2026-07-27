"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export type CheckboxVariant = "primary" | "secondary";
export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps extends Omit<BaseCheckbox.Root.Props, "children" | "className"> {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  rounded?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
}

export function Checkbox({
  "aria-describedby": ariaDescribedBy,
  children,
  className,
  description,
  disabled,
  rounded = false,
  size = "md",
  variant = "primary",
  ...props
}: CheckboxProps): ReactElement {
  const generatedDescriptionId = useId();
  const descriptionId =
    description !== undefined && description !== null
      ? (ariaDescribedBy ?? generatedDescriptionId)
      : ariaDescribedBy;

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders a native checkbox inside its root.
    <label
      className={classes(
        "checkbox",
        `checkbox--${variant}`,
        size !== "md" && `checkbox--${size}`,
        rounded && "checkbox--rounded",
        className,
      )}
      data-disabled={disabled || undefined}
      data-slot="checkbox"
    >
      <span className="checkbox__content" data-slot="checkbox-content">
        <BaseCheckbox.Root
          aria-describedby={descriptionId}
          className="checkbox__control"
          data-slot="checkbox-control"
          disabled={disabled}
          {...props}
        >
          <BaseCheckbox.Indicator className="checkbox__indicator" data-slot="checkbox-indicator" />
        </BaseCheckbox.Root>
        {children !== undefined || description !== undefined ? (
          <span className="checkbox__copy">
            {children !== undefined ? <span className="checkbox__label">{children}</span> : null}
            {description !== undefined ? (
              <span className="checkbox__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    </label>
  );
}
