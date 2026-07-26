"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type DrawerBackdropVariant = "opaque" | "blur" | "transparent";
export type DrawerPlacement = "top" | "right" | "bottom" | "left";
export type DrawerProps<Payload = unknown> = BaseDialog.Root.Props<Payload>;

type DivProps = useRender.ComponentProps<"div">;

function DrawerRoot<Payload = unknown>(props: DrawerProps<Payload>): ReactElement {
  return <BaseDialog.Root {...props} />;
}

export interface DrawerTriggerProps<Payload = unknown>
  extends Omit<BaseDialog.Trigger.Props<Payload>, "className"> {
  className?: string;
}

function DrawerTrigger<Payload = unknown>({
  className,
  ...props
}: DrawerTriggerProps<Payload>): ReactElement {
  return (
    <BaseDialog.Trigger
      className={classes("drawer__trigger", className)}
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

export interface DrawerBackdropProps extends Omit<BaseDialog.Backdrop.Props, "className"> {
  className?: string;
  variant?: DrawerBackdropVariant;
}

function DrawerBackdrop({
  className,
  variant = "opaque",
  ...props
}: DrawerBackdropProps): ReactElement {
  return (
    <BaseDialog.Backdrop
      className={classes("drawer__backdrop", className)}
      data-slot="drawer-backdrop"
      data-variant={variant}
      {...props}
    />
  );
}

export interface DrawerContentProps extends Omit<BaseDialog.Viewport.Props, "className"> {
  className?: string;
  placement?: DrawerPlacement;
}

function DrawerContent({
  className,
  placement = "bottom",
  ...props
}: DrawerContentProps): ReactElement {
  return (
    <BaseDialog.Viewport
      className={classes("drawer__content", className)}
      data-placement={placement}
      data-slot="drawer-content"
      {...props}
    />
  );
}

function DrawerDialog({
  className,
  ...props
}: Omit<BaseDialog.Popup.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Popup
      className={classes("drawer__dialog", className)}
      data-slot="drawer-dialog"
      {...props}
    />
  );
}

function DrawerHeading({
  className,
  ...props
}: Omit<BaseDialog.Title.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Title
      className={classes("drawer__heading", className)}
      data-slot="drawer-heading"
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: Omit<BaseDialog.Description.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Description
      className={classes("drawer__description", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

function DrawerCloseTrigger({
  children,
  className,
  ...props
}: Omit<BaseDialog.Close.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Close
      aria-label={children == null ? "Close" : undefined}
      className={classes("drawer__close-trigger", className)}
      data-slot="drawer-close-trigger"
      {...props}
    >
      {children ?? <span aria-hidden="true" className="drawer__close-icon" />}
    </BaseDialog.Close>
  );
}

function DrawerPart({
  baseClass,
  className,
  dataSlot,
  render,
  ...props
}: DrawerPartProps): ReactElement {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: classes(baseClass, className),
        "data-slot": dataSlot,
      } as DivProps,
      props,
    ),
    render,
  });
}

interface DrawerPartProps extends Omit<DivProps, "className" | "render"> {
  baseClass: string;
  className: string | undefined;
  dataSlot: string;
  render: DivProps["render"] | undefined;
}

function DrawerHeader({ className, render, ...props }: DivProps): ReactElement {
  return (
    <DrawerPart
      baseClass="drawer__header"
      className={className}
      dataSlot="drawer-header"
      render={render}
      {...props}
    />
  );
}

function DrawerBody({ className, render, ...props }: DivProps): ReactElement {
  return (
    <DrawerPart
      baseClass="drawer__body"
      className={className}
      dataSlot="drawer-body"
      render={render}
      {...props}
    />
  );
}

function DrawerFooter({ className, render, ...props }: DivProps): ReactElement {
  return (
    <DrawerPart
      baseClass="drawer__footer"
      className={className}
      dataSlot="drawer-footer"
      render={render}
      {...props}
    />
  );
}

function DrawerHandle({ className, render, ...props }: DivProps): ReactElement {
  return (
    <DrawerPart
      baseClass="drawer__handle"
      className={className}
      dataSlot="drawer-handle"
      render={render}
      {...props}
    />
  );
}

export const Drawer = Object.assign(DrawerRoot, {
  Backdrop: DrawerBackdrop,
  Body: DrawerBody,
  CloseTrigger: DrawerCloseTrigger,
  Content: DrawerContent,
  Description: DrawerDescription,
  Dialog: DrawerDialog,
  Footer: DrawerFooter,
  Handle: DrawerHandle,
  Header: DrawerHeader,
  Heading: DrawerHeading,
  Portal: BaseDialog.Portal,
  Trigger: DrawerTrigger,
});
