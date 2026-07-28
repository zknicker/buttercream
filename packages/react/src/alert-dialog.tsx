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
  /**
   * Where the dialog is portalled. Defaults to the document body.
   *
   * Pass the element the theme tokens are set on whenever they are scoped to a subtree rather
   * than `:root`. Custom properties inherit through the DOM, not through React, so a dialog
   * portalled to the body sits outside that subtree and silently falls back to the defaults.
   *
   * Choose that element with care. A container that establishes containment or a new containing
   * block — `contain`, `container-type`, `transform`, `filter` — becomes the containing block for
   * fixed-position descendants, so a full-viewport backdrop will be confined to it. One that clips
   * or scrolls will cut off content extending past its edge. The nearest themed ancestor is
   * usually right; the nearest scroll container rarely is.
   */
  container?: BaseAlertDialog.Portal.Props["container"];
  description?: ReactNode;
  title: ReactNode;
}

/**
 * A modal that demands an answer.
 *
 * Unlike Modal, clicking the backdrop does not dismiss it — the question has to be answered by
 * one of the actions. Escape still closes it, and deliberately so: an unconditional keyboard
 * exit is what keeps a modal from trapping someone, and it is the one dismissal an alert dialog
 * is expected to keep. Treat Escape as equivalent to the cancelling action, not to confirming.
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
  container,
  description,
  title,
  ...props
}: AlertDialogContentProps): ReactElement {
  return (
    <BaseAlertDialog.Portal container={container}>
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
