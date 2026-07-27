"use client";

import { Field as BaseField } from "@base-ui/react/field";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * The reference lists Label, Description and FieldError as components in their own right. They
 * are only meaningful inside a field, and Base UI wires them to their control through the field
 * root's context, so they are exposed here as parts of one compound rather than free functions.
 */

export interface FieldProps extends Omit<BaseField.Root.Props, "className"> {
  className?: string;
  fullWidth?: boolean;
}

function FieldRoot({ className, fullWidth = false, ...props }: FieldProps): ReactElement {
  return (
    <BaseField.Root
      className={classes("field", fullWidth && "field--full-width", className)}
      data-slot="field"
      {...props}
    />
  );
}

export interface FieldLabelProps extends Omit<BaseField.Label.Props, "className"> {
  className?: string;
  /** Marks the label with an asterisk. The control still needs its own `required`. */
  required?: boolean;
}

function FieldLabel({ className, required = false, ...props }: FieldLabelProps): ReactElement {
  return (
    <BaseField.Label
      className={classes("label", required && "label--required", className)}
      data-slot="label"
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: Omit<BaseField.Description.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseField.Description
      className={classes("description", className)}
      data-slot="description"
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: Omit<BaseField.Error.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseField.Error
      className={classes("field-error", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

export const Field = Object.assign(FieldRoot, {
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
});
