"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type TooltipProps<Payload = unknown> = BaseTooltip.Root.Props<Payload>;

function TooltipRoot<Payload = unknown>(props: TooltipProps<Payload>): ReactElement {
  return <BaseTooltip.Root {...props} />;
}

export type TooltipProviderProps = BaseTooltip.Provider.Props;

function TooltipProvider(props: TooltipProviderProps): ReactElement {
  return <BaseTooltip.Provider {...props} />;
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
  positionerClassName?: string;
}

function TooltipContent({
  arrow = false,
  children,
  className,
  positionerClassName,
  side = "top",
  sideOffset = 8,
  ...props
}: TooltipContentProps): ReactElement {
  return (
    <BaseTooltip.Portal>
      <TooltipPositioner
        side={side}
        sideOffset={sideOffset}
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
  className,
  ...props
}: Omit<BaseTooltip.Arrow.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTooltip.Arrow
      className={classes("tooltip__arrow", className)}
      data-slot="tooltip-arrow"
      {...props}
    />
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
