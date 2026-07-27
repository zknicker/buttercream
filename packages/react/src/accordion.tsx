"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type AccordionVariant = "plain" | "surface";

export interface AccordionProps extends Omit<BaseAccordion.Root.Props, "className"> {
  className?: string;
  variant?: AccordionVariant;
}

function AccordionRoot({ className, variant = "plain", ...props }: AccordionProps): ReactElement {
  return (
    <BaseAccordion.Root
      className={classes("accordion", variant !== "plain" && `accordion--${variant}`, className)}
      data-slot="accordion"
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: Omit<BaseAccordion.Item.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseAccordion.Item
      className={classes("accordion__item", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

export interface AccordionTriggerProps extends Omit<BaseAccordion.Trigger.Props, "className"> {
  className?: string;
  /** Replaces the chevron. Rotation on open is applied by the stylesheet either way. */
  indicator?: ReactNode;
}

/**
 * The heading wraps the trigger so the panel is reachable from a screen reader's heading list;
 * Base UI gives the heading its level from the accordion's context.
 */
function AccordionTrigger({
  children,
  className,
  indicator,
  ...props
}: AccordionTriggerProps): ReactElement {
  return (
    <BaseAccordion.Header className="accordion__header" data-slot="accordion-header">
      <BaseAccordion.Trigger
        className={classes("accordion__trigger", className)}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <span aria-hidden="true" className="accordion__indicator" data-slot="accordion-indicator">
          {indicator ?? (
            <svg
              aria-hidden="true"
              fill="none"
              role="presentation"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
              />
            </svg>
          )}
        </span>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

function AccordionPanel({
  children,
  className,
  ...props
}: Omit<BaseAccordion.Panel.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseAccordion.Panel
      className={classes("accordion__panel", className)}
      data-slot="accordion-panel"
      {...props}
    >
      {/* An inner box holds the padding: padding on the animated element would jump at 0 height. */}
      <div className="accordion__body" data-slot="accordion-body">
        {children}
      </div>
    </BaseAccordion.Panel>
  );
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Panel: AccordionPanel,
  Trigger: AccordionTrigger,
});
