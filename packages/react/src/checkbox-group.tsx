"use client";

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export interface CheckboxGroupProps
  extends Omit<BaseCheckboxGroup.Props, "children" | "className"> {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  /** Names the set. Without it the checkboxes are announced as unrelated controls. */
  label?: ReactNode;
}

/**
 * A named set of checkboxes.
 *
 * The group carries the name and any explanation, so the individual boxes do not have to repeat
 * it. Base UI owns the shared `value`, which is what makes a parent checkbox possible: give the
 * parent `indeterminate` when some but not all of the set are checked.
 */
export function CheckboxGroup({
  children,
  className,
  description,
  label,
  ...props
}: CheckboxGroupProps): ReactElement {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <BaseCheckboxGroup
      aria-describedby={description === undefined ? undefined : descriptionId}
      aria-labelledby={label === undefined ? undefined : labelId}
      className={classes("checkbox-group", className)}
      data-slot="checkbox-group"
      {...props}
    >
      {label === undefined ? null : (
        <span className="checkbox-group__label" data-slot="checkbox-group-label" id={labelId}>
          {label}
        </span>
      )}
      {description === undefined ? null : (
        <span
          className="checkbox-group__description"
          data-slot="checkbox-group-description"
          id={descriptionId}
        >
          {description}
        </span>
      )}
      {children}
    </BaseCheckboxGroup>
  );
}
