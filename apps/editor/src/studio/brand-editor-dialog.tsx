import { Dialog } from "@base-ui/react/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  Button,
  classes,
  DialogFooter,
  DialogHeader,
  dialogBackdropClass,
  dialogDescriptionClass,
  dialogPanelClass,
  dialogTitleClass,
  dialogViewportClass,
  Input,
  Textarea,
} from "../ui/index.ts";

/**
 * The one editor every authored field on the Brand page opens.
 *
 * Editor chrome, deliberately: the page frames a themed preview, and a field that inherited the
 * theme it edits would change shape under the user mid-sentence (CONTEXT.md invariant 4).
 *
 * The draft is local until Save. These fields are paragraphs rather than token values, so
 * live-committing every keystroke would put a save request behind each one and leave a
 * half-typed sentence in the exported `DESIGN.md`. Custom CSS is the exception that proves the
 * rule — it repaints the preview, so it commits on Save and repaints then.
 */
export interface BrandEditorDialogProps {
  /** Monospace field with room for a stylesheet, rather than a paragraph box. */
  code?: boolean;
  description: string;
  label: string;
  multiline?: boolean;
  onSave: (value: string) => void;
  placeholder: string;
  title: string;
  /** The element that opens the dialog — a whole card on the Brand page, a plain button elsewhere. */
  trigger: ReactElement;
  value: string;
}

export function BrandEditorDialog({
  code = false,
  description,
  label,
  multiline = true,
  onSave,
  placeholder,
  title,
  trigger,
  value,
}: BrandEditorDialogProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const fieldId = `brand-field-${title.toLowerCase().replaceAll(/[^a-z0-9]+/gu, "-")}`;

  return (
    <Dialog.Root
      onOpenChange={(nextOpen) => {
        /* Opening re-reads the document, so a cancelled edit leaves nothing behind. */
        if (nextOpen) {
          setDraft(value);
        }
        setOpen(nextOpen);
      }}
      open={open}
    >
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <Dialog.Viewport className={dialogViewportClass}>
          <Dialog.Popup
            className={classes(
              dialogPanelClass,
              code ? "w-[min(48rem,calc(100vw-3rem))]" : "w-[min(36rem,calc(100vw-3rem))]",
            )}
          >
            <DialogHeader
              close={
                <Dialog.Close
                  aria-label={`Close ${title.toLowerCase()}`}
                  render={<Button iconOnly size="sm" variant="ghost" />}
                >
                  <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
                </Dialog.Close>
              }
            >
              <Dialog.Title className={dialogTitleClass}>{title}</Dialog.Title>
              <Dialog.Description className={dialogDescriptionClass}>
                {description}
              </Dialog.Description>
            </DialogHeader>

            <label className="flex min-h-0 flex-1 flex-col gap-2" htmlFor={fieldId}>
              <span className="font-mono text-xs tracking-wide text-shell-muted uppercase">
                {label}
              </span>
              {multiline ? (
                <Textarea
                  className={code ? "min-h-80" : "min-h-45"}
                  code={code}
                  id={fieldId}
                  name={fieldId}
                  onChange={(event) => setDraft(event.currentTarget.value)}
                  placeholder={placeholder}
                  {...(code ? { spellCheck: "false" as const } : {})}
                  value={draft}
                />
              ) : (
                <Input
                  fullWidth
                  id={fieldId}
                  name={fieldId}
                  onChange={(event) => setDraft(event.currentTarget.value)}
                  placeholder={placeholder}
                  value={draft}
                />
              )}
            </label>

            <DialogFooter>
              <Dialog.Close render={<Button variant="ghost" />}>Cancel</Dialog.Close>
              <Button
                onClick={() => {
                  onSave(draft);
                  setOpen(false);
                }}
              >
                Save
              </Button>
            </DialogFooter>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
