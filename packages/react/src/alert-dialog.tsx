"use client";

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export interface AlertDialogProps extends BaseAlertDialog.Root.Props {}

export interface AlertDialogContentProps
  extends Omit<BaseAlertDialog.Popup.Props, "className" | "title"> {
  /** The buttons. Put the confirming action last — the layout aligns them trailing. */
  actions?: ReactNode;
  className?: string;
  description?: ReactNode;
  title: ReactNode;
}

/**
 * A modal that demands an answer. Unlike Modal it cannot be dismissed by clicking the backdrop
 * or pressing Escape — Base UI's alert dialog enforces that, which is the whole reason it is a
 * separate primitive rather than a styling variant.
 */
function AlertDialogRoot(props: AlertDialogProps): ReactElement {
  return <BaseAlertDialog.Root {...props} />;
}

function AlertDialogTrigger({
  className,
  ...props
}: Omit<BaseAlertDialog.Trigger.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseAlertDialog.Trigger
      className={classes("alert-dialog__trigger", className)}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

/**
 * Title is required rather than optional: an alert dialog is named by its title through
 * `aria-labelledby`, and one without a name announces itself as an unlabelled dialog.
 */
function AlertDialogContent({
  actions,
  className,
  description,
  title,
  ...props
}: AlertDialogContentProps): ReactElement {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        className="alert-dialog__backdrop"
        data-slot="alert-dialog-backdrop"
      />
      <BaseAlertDialog.Popup
        className={classes("alert-dialog__popup", className)}
        data-slot="alert-dialog-popup"
        {...props}
      >
        <BaseAlertDialog.Title className="alert-dialog__title" data-slot="alert-dialog-title">
          {title}
        </BaseAlertDialog.Title>
        {description === undefined ? null : (
          <BaseAlertDialog.Description
            className="alert-dialog__description"
            data-slot="alert-dialog-description"
          >
            {description}
          </BaseAlertDialog.Description>
        )}
        {actions === undefined ? null : (
          <div className="alert-dialog__actions" data-slot="alert-dialog-actions">
            {actions}
          </div>
        )}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

function AlertDialogClose({
  className,
  ...props
}: Omit<BaseAlertDialog.Close.Props, "className"> & { className?: string }): ReactElement {
  return <BaseAlertDialog.Close className={className} data-slot="alert-dialog-close" {...props} />;
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Close: AlertDialogClose,
  Content: AlertDialogContent,
  Trigger: AlertDialogTrigger,
});
