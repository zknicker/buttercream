"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<BaseSwitch.Root.Props, "children" | "className"> {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  size?: SwitchSize;
}

export function Switch({
  "aria-describedby": ariaDescribedBy,
  children,
  className,
  description,
  disabled,
  size = "md",
  ...props
}: SwitchProps): ReactElement {
  const generatedDescriptionId = useId();
  const descriptionId =
    description !== undefined && description !== null
      ? (ariaDescribedBy ?? generatedDescriptionId)
      : ariaDescribedBy;

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: Base UI renders a native checkbox inside its root.
    <label
      className={classes("switch", size !== "md" && `switch--${size}`, className)}
      data-disabled={disabled || undefined}
      data-slot="switch"
    >
      <BaseSwitch.Root
        aria-describedby={descriptionId}
        className="switch__control"
        data-slot="switch-control"
        disabled={disabled}
        {...props}
      >
        <BaseSwitch.Thumb className="switch__thumb" data-slot="switch-thumb" />
      </BaseSwitch.Root>
      {children !== undefined || description !== undefined ? (
        <span className="switch__copy">
          {children !== undefined ? <span className="switch__label">{children}</span> : null}
          {description !== undefined ? (
            <span className="switch__description" id={descriptionId}>
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
