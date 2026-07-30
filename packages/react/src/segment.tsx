"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flipItemsRef = useRef<Map<HTMLElement, DOMRect>>(new Map());
  const [flipFrom, setFlipFrom] = useState<DOMRect | null>(null);
  /*
   * Single selection, enforced: the group is always controlled from here, so the empty
   * selection a re-pressed toggle reports can never render — a segmented control with
   * nothing on is a radio group with no answer.
   */
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selected = value ?? internalValue;

  /*
   * The whole row moves FLIP-style: every box is measured before the selection commits, and
   * whatever landed somewhere new plays from its old spot to its new one. Items whose width
   * changed shift their neighbours, so those neighbours glide instead of snapping; the pill
   * plays its own leg relative to its item, so the two animations compose to the full path.
   */
  useLayoutEffect(() => {
    const from = flipFrom;
    const root = rootRef.current;
    const itemsFrom = flipItemsRef.current;
    flipItemsRef.current = new Map();
    if (!from || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    /*
     * Measure everything before starting anything: a running animation's transform shows up in
     * getBoundingClientRect immediately, so a rect taken after a sibling loop's animate() call
     * would already carry the parent's initial offset and the compensation below would double.
     */
    const timing = { duration: 250, easing: "cubic-bezier(0.32, 0.72, 0, 1)" } as const;
    const itemDeltas = new Map<HTMLElement, { dx: number; dy: number }>();
    for (const [item, itemFrom] of itemsFrom) {
      if (!item.isConnected) {
        continue;
      }
      const itemTo = item.getBoundingClientRect();
      itemDeltas.set(item, { dx: itemFrom.left - itemTo.left, dy: itemFrom.top - itemTo.top });
    }
    const indicator = root.querySelector<HTMLElement>("[data-pressed] > .segment__indicator");
    const to = indicator?.getBoundingClientRect();

    for (const [item, { dx, dy }] of itemDeltas) {
      if (dx !== 0 || dy !== 0) {
        item.animate([{ translate: `${dx}px ${dy}px` }, { translate: "0 0" }], timing);
      }
    }

    if (!indicator || !to) {
      return;
    }
    if (from.left === to.left && from.top === to.top && from.width === to.width) {
      return;
    }
    /* The item's own glide already carries the indicator part of the way. */
    const carried = itemDeltas.get(indicator.closest<HTMLElement>(".segment__item") as HTMLElement);
    const dx = from.left - to.left - (carried?.dx ?? 0);
    const dy = from.top - to.top - (carried?.dy ?? 0);
    indicator.animate(
      [
        {
          height: `${from.height}px`,
          translate: `${dx}px ${dy}px`,
          width: `${from.width}px`,
        },
        { height: `${to.height}px`, translate: "0 0", width: `${to.width}px` },
      ],
      timing,
    );
  }, [flipFrom]);

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
        onValueChange={(next) => {
          /*
           * A segmented control always has exactly one segment on, so pressing the active
           * segment — which the toggle group reports as an empty selection — is not a change.
           */
          const [first] = next;
          if (first !== undefined) {
            const itemsFrom = new Map<HTMLElement, DOMRect>();
            for (const item of rootRef.current?.querySelectorAll<HTMLElement>(".segment__item") ??
              []) {
              itemsFrom.set(item, item.getBoundingClientRect());
            }
            flipItemsRef.current = itemsFrom;
            setFlipFrom(
              rootRef.current
                ?.querySelector("[data-pressed] > .segment__indicator")
                ?.getBoundingClientRect() ?? null,
            );
            setInternalValue(first);
            onValueChange?.(first);
          }
        }}
        ref={rootRef}
        value={selected === undefined ? [] : [selected]}
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
