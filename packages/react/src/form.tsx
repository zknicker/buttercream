"use client";

import { Form as BaseForm } from "@base-ui/react/form";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * The reference gives Form no styling of its own — it exists to collect field errors and
 * consolidate validation. Kept as a thin pass-through so a consuming app lays it out itself.
 */
export interface FormProps extends Omit<BaseForm.Props, "className"> {
  className?: string;
}

export function Form({ className, ...props }: FormProps): ReactElement {
  return <BaseForm className={classes("form", className)} data-slot="form" {...props} />;
}
