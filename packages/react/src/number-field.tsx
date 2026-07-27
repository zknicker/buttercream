"use client";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export interface NumberFieldProps extends Omit<BaseNumberField.Root.Props, "className"> {
  className?: string;
  /** Replaces the default minus glyph on the decrement stepper. */
  decrementLabel?: ReactNode;
  /** Replaces the default plus glyph on the increment stepper. */
  incrementLabel?: ReactNode;
}

/**
 * A numeric input flanked by steppers. The group is one bordered control, so the buttons drop
 * their own outer borders and only the seam against the input is drawn.
 */
export function NumberField({
  className,
  decrementLabel = "−",
  incrementLabel = "+",
  ...props
}: NumberFieldProps): ReactElement {
  return (
    <BaseNumberField.Root
      className={classes("number-field", className)}
      data-slot="number-field"
      {...props}
    >
      <BaseNumberField.Group className="number-field__group" data-slot="number-field-group">
        <BaseNumberField.Decrement
          aria-label="Decrease"
          className="number-field__decrement"
          data-slot="number-field-decrement"
        >
          {decrementLabel}
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="number-field__input" data-slot="number-field-input" />
        <BaseNumberField.Increment
          aria-label="Increase"
          className="number-field__increment"
          data-slot="number-field-increment"
        >
          {incrementLabel}
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
