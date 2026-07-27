"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import { classes } from "./classes.ts";

export type SegmentSize = "sm" | "md" | "lg";

export type SegmentVariant = "default" | "ghost";

interface SegmentContextValue {
  size: SegmentSize;
  variant: SegmentVariant;
}

const SegmentContext = createContext<SegmentContextValue>({ size: "md", variant: "default" });

export interface SegmentProps
  extends Omit<BaseToggleGroup.Props, "className" | "defaultValue" | "onValueChange" | "value"> {
  className?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SegmentSize;
  value?: string;
  variant?: SegmentVariant;
}

/**
 * A segmented control. Built on Base UI's toggle group rather than tabs, because the segments
 * pick a value rather than reveal a panel.
 */
function SegmentRoot({
  children,
  className,
  defaultValue,
  onValueChange,
  size = "md",
  value,
  variant = "default",
  ...props
}: SegmentProps): ReactElement {
  return (
    <SegmentContext.Provider value={{ size, variant }}>
      <BaseToggleGroup
        className={classes(
          "segment",
          size !== "md" && `segment--${size}`,
          variant !== "default" && `segment--${variant}`,
          className,
        )}
        data-slot="segment"
        defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
        onValueChange={(next) => {
          /*
           * A segmented control always has exactly one segment on, so pressing the active
           * segment — which the toggle group reports as an empty selection — is not a change.
           */
          const [first] = next;
          if (first !== undefined) {
            onValueChange?.(first);
          }
        }}
        value={value === undefined ? undefined : [value]}
        {...props}
      >
        {children}
      </BaseToggleGroup>
    </SegmentContext.Provider>
  );
}

export interface SegmentItemProps extends Omit<BaseToggle.Props, "className"> {
  children?: ReactNode;
  className?: string;
}

function SegmentItem({ children, className, ...props }: SegmentItemProps): ReactElement {
  const { size, variant } = useContext(SegmentContext);

  return (
    <BaseToggle
      className={classes(
        "segment__item",
        `segment__item--${size}`,
        variant !== "default" && `segment__item--${variant}`,
        className,
      )}
      data-slot="segment-item"
      {...props}
    >
      {/*
       * Both the pill and the hairline are rendered on every segment and revealed by CSS off
       * `data-pressed`, so neither has to know which segment is currently on.
       */}
      <span aria-hidden className={classes("segment__separator")} data-slot="segment-separator" />
      <span
        aria-hidden
        className={classes(
          "segment__indicator",
          variant !== "default" && `segment__indicator--${variant}`,
        )}
        data-slot="segment-indicator"
      />
      {children}
    </BaseToggle>
  );
}

export const Segment = Object.assign(SegmentRoot, {
  Item: SegmentItem,
});
