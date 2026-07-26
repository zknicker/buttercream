"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export type PopoverProps<Payload = unknown> = BasePopover.Root.Props<Payload>;

function PopoverRoot<Payload = unknown>(props: PopoverProps<Payload>): ReactElement {
  return <BasePopover.Root {...props} />;
}

export interface PopoverTriggerProps<Payload = unknown>
  extends Omit<BasePopover.Trigger.Props<Payload>, "className"> {
  className?: string;
}

function PopoverTrigger<Payload = unknown>({
  className,
  ...props
}: PopoverTriggerProps<Payload>): ReactElement {
  return (
    <BasePopover.Trigger
      className={classes("popover__trigger", className)}
      data-slot="popover-trigger"
      {...props}
    />
  );
}

export interface PopoverContentProps
  extends Omit<BasePopover.Positioner.Props, "children" | "className"> {
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  initialFocus?: BasePopover.Popup.Props["initialFocus"];
  positionerClassName?: string;
}

function PopoverContent({
  arrow = false,
  children,
  className,
  initialFocus,
  positionerClassName,
  side = "bottom",
  sideOffset = 8,
  ...props
}: PopoverContentProps): ReactElement {
  return (
    <BasePopover.Portal>
      <PopoverPositioner
        side={side}
        sideOffset={sideOffset}
        {...(positionerClassName === undefined ? {} : { className: positionerClassName })}
        {...props}
      >
        <PopoverPopup
          {...(className === undefined ? {} : { className })}
          {...(initialFocus === undefined ? {} : { initialFocus })}
        >
          {arrow ? <PopoverArrow /> : null}
          {children}
        </PopoverPopup>
      </PopoverPositioner>
    </BasePopover.Portal>
  );
}

function PopoverPositioner({
  className,
  ...props
}: Omit<BasePopover.Positioner.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Positioner
      className={classes("popover__positioner", className)}
      data-slot="popover-positioner"
      {...props}
    />
  );
}

function PopoverPopup({
  className,
  ...props
}: Omit<BasePopover.Popup.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Popup
      className={classes("popover__popup", className)}
      data-slot="popover-popup"
      {...props}
    />
  );
}

function PopoverArrow({
  className,
  ...props
}: Omit<BasePopover.Arrow.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Arrow
      className={classes("popover__arrow", className)}
      data-slot="popover-arrow"
      {...props}
    />
  );
}

function PopoverBackdrop({
  className,
  ...props
}: Omit<BasePopover.Backdrop.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Backdrop
      className={classes("popover__backdrop", className)}
      data-slot="popover-backdrop"
      {...props}
    />
  );
}

function PopoverViewport({
  className,
  ...props
}: Omit<BasePopover.Viewport.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Viewport
      className={classes("popover__viewport", className)}
      data-slot="popover-viewport"
      {...props}
    />
  );
}

function PopoverTitle({
  className,
  ...props
}: Omit<BasePopover.Title.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Title
      className={classes("popover__title", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: Omit<BasePopover.Description.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Description
      className={classes("popover__description", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

function PopoverClose({
  className,
  ...props
}: Omit<BasePopover.Close.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BasePopover.Close
      className={classes("popover__close", className)}
      data-slot="popover-close"
      {...props}
    />
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Arrow: PopoverArrow,
  Backdrop: PopoverBackdrop,
  Close: PopoverClose,
  Content: PopoverContent,
  Description: PopoverDescription,
  Popup: PopoverPopup,
  Portal: BasePopover.Portal,
  Positioner: PopoverPositioner,
  Title: PopoverTitle,
  Trigger: PopoverTrigger,
  Viewport: PopoverViewport,
});
