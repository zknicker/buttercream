"use client";

import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export type RadioGroupOrientation = "horizontal" | "vertical";
export type RadioGroupSize = "sm" | "md" | "lg";
export type RadioGroupVariant = "primary" | "secondary";

export interface RadioGroupProps<Value = unknown>
  extends Omit<BaseRadioGroup.Props<Value>, "className"> {
  className?: string;
  description?: ReactNode;
  label?: ReactNode;
  orientation?: RadioGroupOrientation;
  size?: RadioGroupSize;
  variant?: RadioGroupVariant;
}

function RadioGroupRoot<Value = unknown>({
  "aria-describedby": ariaDescribedBy,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  description,
  disabled,
  label,
  orientation = "vertical",
  size = "md",
  variant = "primary",
  ...props
}: RadioGroupProps<Value>): ReactElement {
  const generatedLabelId = useId();
  const generatedDescriptionId = useId();
  const labelId = label !== undefined ? (ariaLabelledBy ?? generatedLabelId) : ariaLabelledBy;
  const descriptionId =
    description !== undefined ? (ariaDescribedBy ?? generatedDescriptionId) : ariaDescribedBy;

  return (
    <BaseRadioGroup
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className={classes(
        "radio-group",
        `radio-group--${variant}`,
        `radio-group--${orientation}`,
        size !== "md" && `radio-group--${size}`,
        className,
      )}
      data-slot="radio-group"
      disabled={disabled}
      {...props}
    >
      {label !== undefined || description !== undefined ? (
        <div className="radio-group__header">
          {label !== undefined ? (
            <div className="radio-group__label" id={labelId}>
              {label}
            </div>
          ) : null}
          {description !== undefined ? (
            <div className="radio-group__description" id={descriptionId}>
              {description}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="radio-group__items">{children}</div>
    </BaseRadioGroup>
  );
}

export interface RadioGroupItemProps<Value = unknown>
  extends Omit<BaseRadio.Root.Props<Value>, "children" | "className"> {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
}

function RadioGroupItem<Value = unknown>({
  "aria-describedby": ariaDescribedBy,
  children,
  className,
  description,
  disabled,
  ...props
}: RadioGroupItemProps<Value>): ReactElement {
  const generatedDescriptionId = useId();
  const descriptionId =
    description !== undefined ? (ariaDescribedBy ?? generatedDescriptionId) : ariaDescribedBy;

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders a native radio input beside its root.
    <label
      className={classes("radio", className)}
      data-disabled={disabled || undefined}
      data-slot="radio"
    >
      <BaseRadio.Root
        aria-describedby={descriptionId}
        className="radio__control"
        data-slot="radio-control"
        disabled={disabled}
        {...props}
      >
        <BaseRadio.Indicator className="radio__indicator" data-slot="radio-indicator" />
      </BaseRadio.Root>
      {children !== undefined || description !== undefined ? (
        <span className="radio__copy">
          {children !== undefined ? <span className="radio__label">{children}</span> : null}
          {description !== undefined ? (
            <span className="radio__description" id={descriptionId}>
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
