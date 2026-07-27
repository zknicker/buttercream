"use client";

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export interface FieldsetProps extends Omit<BaseFieldset.Root.Props, "className"> {
  className?: string;
}

function FieldsetRoot({ className, ...props }: FieldsetProps): ReactElement {
  return (
    <BaseFieldset.Root className={classes("fieldset", className)} data-slot="fieldset" {...props} />
  );
}

function FieldsetLegend({
  className,
  ...props
}: Omit<BaseFieldset.Legend.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseFieldset.Legend
      className={classes("fieldset__legend", className)}
      data-slot="fieldset-legend"
      /* Base UI defaults this to a div; a native fieldset needs a real legend to be labelled
         by it, and the reference renders one too. */
      render={<legend />}
      {...props}
    />
  );
}

/* Group and Actions are plain layout slots; Base UI has no primitive for either. */
function FieldsetGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">): ReactElement {
  return (
    <div
      className={classes("fieldset__field-group", className)}
      data-slot="fieldset-field-group"
      {...props}
    />
  );
}

function FieldsetActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">): ReactElement {
  return (
    <div
      className={classes("fieldset__actions", className)}
      data-slot="fieldset-actions"
      {...props}
    />
  );
}

export const Fieldset = Object.assign(FieldsetRoot, {
  Actions: FieldsetActions,
  Group: FieldsetGroup,
  Legend: FieldsetLegend,
});
