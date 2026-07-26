"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type ModalBackdropVariant = "opaque" | "blur" | "transparent";
export type ModalPlacement = "auto" | "top" | "center" | "bottom";
export type ModalProps<Payload = unknown> = BaseDialog.Root.Props<Payload>;

type DivProps = useRender.ComponentProps<"div">;

function ModalRoot<Payload = unknown>(props: ModalProps<Payload>): ReactElement {
  return <BaseDialog.Root {...props} />;
}

export interface ModalTriggerProps<Payload = unknown>
  extends Omit<BaseDialog.Trigger.Props<Payload>, "className"> {
  className?: string;
}

function ModalTrigger<Payload = unknown>({
  className,
  ...props
}: ModalTriggerProps<Payload>): ReactElement {
  return (
    <BaseDialog.Trigger
      className={classes("modal__trigger", className)}
      data-slot="modal-trigger"
      {...props}
    />
  );
}

export interface ModalBackdropProps extends Omit<BaseDialog.Backdrop.Props, "className"> {
  className?: string;
  variant?: ModalBackdropVariant;
}

function ModalBackdrop({
  className,
  variant = "opaque",
  ...props
}: ModalBackdropProps): ReactElement {
  return (
    <BaseDialog.Backdrop
      className={classes("modal__backdrop", className)}
      data-slot="modal-backdrop"
      data-variant={variant}
      {...props}
    />
  );
}

export interface ModalContainerProps extends Omit<BaseDialog.Viewport.Props, "className"> {
  className?: string;
  placement?: ModalPlacement;
}

function ModalContainer({
  className,
  placement = "auto",
  ...props
}: ModalContainerProps): ReactElement {
  return (
    <BaseDialog.Viewport
      className={classes("modal__container", className)}
      data-placement={placement}
      data-slot="modal-container"
      {...props}
    />
  );
}

function ModalDialog({
  className,
  ...props
}: Omit<BaseDialog.Popup.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Popup
      className={classes("modal__dialog", className)}
      data-slot="modal-dialog"
      {...props}
    />
  );
}

function ModalHeading({
  className,
  ...props
}: Omit<BaseDialog.Title.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Title
      className={classes("modal__heading", className)}
      data-slot="modal-heading"
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: Omit<BaseDialog.Description.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Description
      className={classes("modal__description", className)}
      data-slot="modal-description"
      {...props}
    />
  );
}

function ModalCloseTrigger({
  children,
  className,
  ...props
}: Omit<BaseDialog.Close.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseDialog.Close
      aria-label={children == null ? "Close" : undefined}
      className={classes("modal__close-trigger", className)}
      data-slot="modal-close-trigger"
      {...props}
    >
      {children ?? <span aria-hidden="true" className="modal__close-icon" />}
    </BaseDialog.Close>
  );
}

function ModalPart({
  baseClass,
  className,
  dataSlot,
  render,
  ...props
}: ModalPartProps): ReactElement {
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

interface ModalPartProps extends Omit<DivProps, "className" | "render"> {
  baseClass: string;
  className: string | undefined;
  dataSlot: string;
  render: DivProps["render"] | undefined;
}

function ModalHeader({ className, render, ...props }: DivProps): ReactElement {
  return (
    <ModalPart
      baseClass="modal__header"
      className={className}
      dataSlot="modal-header"
      render={render}
      {...props}
    />
  );
}

function ModalIcon({ className, render, ...props }: DivProps): ReactElement {
  return (
    <ModalPart
      baseClass="modal__icon"
      className={className}
      dataSlot="modal-icon"
      render={render}
      {...props}
    />
  );
}

function ModalBody({ className, render, ...props }: DivProps): ReactElement {
  return (
    <ModalPart
      baseClass="modal__body"
      className={className}
      dataSlot="modal-body"
      render={render}
      {...props}
    />
  );
}

function ModalFooter({ className, render, ...props }: DivProps): ReactElement {
  return (
    <ModalPart
      baseClass="modal__footer"
      className={className}
      dataSlot="modal-footer"
      render={render}
      {...props}
    />
  );
}

export const Modal = Object.assign(ModalRoot, {
  Backdrop: ModalBackdrop,
  Body: ModalBody,
  CloseTrigger: ModalCloseTrigger,
  Container: ModalContainer,
  Description: ModalDescription,
  Dialog: ModalDialog,
  Footer: ModalFooter,
  Header: ModalHeader,
  Heading: ModalHeading,
  Icon: ModalIcon,
  Portal: BaseDialog.Portal,
  Trigger: ModalTrigger,
});
