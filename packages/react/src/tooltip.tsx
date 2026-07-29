"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type TooltipProps<Payload = unknown> = BaseTooltip.Root.Props<Payload>;

function TooltipRoot<Payload = unknown>(props: TooltipProps<Payload>): ReactElement {
  return <BaseTooltip.Root {...props} />;
}

export type TooltipProviderProps = BaseTooltip.Provider.Props;

function TooltipProvider({
  closeDelay = 500,
  delay = 1500,
  ...props
}: TooltipProviderProps): ReactElement {
  return <BaseTooltip.Provider closeDelay={closeDelay} delay={delay} {...props} />;
}

export interface TooltipTriggerProps<Payload = unknown>
  extends Omit<BaseTooltip.Trigger.Props<Payload>, "className"> {
  className?: string;
}

function TooltipTrigger<Payload = unknown>({
  className,
  ...props
}: TooltipTriggerProps<Payload>): ReactElement {
  return (
    <BaseTooltip.Trigger
      className={classes("tooltip__trigger", className)}
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

export interface TooltipContentProps
  extends Omit<BaseTooltip.Positioner.Props, "children" | "className"> {
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  /**
   * Where the content is portalled. Defaults to the document body.
   *
   * Pass the element the theme tokens are set on whenever they are scoped to a subtree rather
   * than `:root`. Custom properties inherit through the DOM, not through React, so content
   * portalled to the body sits outside that subtree and silently falls back to the defaults.
   *
   * Choose that element with care. A container that establishes containment or a new
   * containing block — `contain`, `container-type`, `transform`, `filter` — becomes the
   * containing block for fixed-position descendants, so a full-viewport backdrop will be
   * confined to it. One that clips or scrolls will cut off content extending past its edge.
   * The nearest themed ancestor is usually right; the nearest scroll container rarely is.
   */
  container?: BaseTooltip.Portal.Props["container"];
  positionerClassName?: string;
}

function TooltipContent({
  arrow = false,
  children,
  className,
  container,
  positionerClassName,
  side = "top",
  sideOffset,
  ...props
}: TooltipContentProps): ReactElement {
  return (
    <BaseTooltip.Portal container={container}>
      <TooltipPositioner
        side={side}
        sideOffset={sideOffset ?? (arrow ? 7 : 3)}
        {...(positionerClassName === undefined ? {} : { className: positionerClassName })}
        {...props}
      >
        <TooltipPopup {...(className === undefined ? {} : { className })}>
          {arrow ? <TooltipArrow /> : null}
          {children}
        </TooltipPopup>
      </TooltipPositioner>
    </BaseTooltip.Portal>
  );
}

function TooltipPositioner({
  className,
  ...props
}: Omit<BaseTooltip.Positioner.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTooltip.Positioner
      className={classes("tooltip__positioner", className)}
      data-slot="tooltip-positioner"
      {...props}
    />
  );
}

function TooltipPopup({
  className,
  ...props
}: Omit<BaseTooltip.Popup.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTooltip.Popup
      className={classes("tooltip__popup", className)}
      data-slot="tooltip-popup"
      {...props}
    />
  );
}

function TooltipArrow({
  children,
  className,
  ...props
}: Omit<BaseTooltip.Arrow.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTooltip.Arrow
      className={classes("tooltip__arrow", className)}
      data-slot="tooltip-arrow"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 12 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
        </svg>
      )}
    </BaseTooltip.Arrow>
  );
}

function TooltipViewport({
  className,
  ...props
}: Omit<BaseTooltip.Viewport.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTooltip.Viewport
      className={classes("tooltip__viewport", className)}
      data-slot="tooltip-viewport"
      {...props}
    />
  );
}

export const Tooltip = Object.assign(TooltipRoot, {
  Arrow: TooltipArrow,
  Content: TooltipContent,
  Popup: TooltipPopup,
  Portal: BaseTooltip.Portal,
  Positioner: TooltipPositioner,
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Viewport: TooltipViewport,
});
