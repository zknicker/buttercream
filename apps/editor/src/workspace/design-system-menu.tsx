import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import Copy01Icon from "@hugeicons-pro/core-stroke-rounded/Copy01Icon";
import Delete02Icon from "@hugeicons-pro/core-stroke-rounded/Delete02Icon";
import MoreHorizontalIcon from "@hugeicons-pro/core-stroke-rounded/MoreHorizontalIcon";
import PencilEdit02Icon from "@hugeicons-pro/core-stroke-rounded/PencilEdit02Icon";
import { useRouter } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  deleteDesignSystemFn,
  duplicateDesignSystemFn,
  renameDesignSystemFn,
} from "../server/design-system-functions.ts";
import type { DesignSystemCardData } from "../server/design-systems.ts";
import {
  Button,
  DialogFooter,
  DialogHeader,
  dialogBackdropClass,
  dialogDescriptionClass,
  dialogPanelClass,
  dialogTitleClass,
  dialogViewportClass,
  Input,
  Menu,
} from "../ui/index.ts";

/*
 * Per-card actions. Every mutation is pessimistic: await the server function, then invalidate
 * the route so the list re-reads. The grid is loader-owned state, and an optimistic copy would
 * only be something for the next invalidation to fight.
 */

type Pending = "none" | "duplicating";

export function DesignSystemMenu({
  designSystem,
}: {
  designSystem: DesignSystemCardData;
}): ReactElement {
  const router = useRouter();
  const [pending, setPending] = useState<Pending>("none");
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const duplicate = async () => {
    setPending("duplicating");
    try {
      await duplicateDesignSystemFn({ data: designSystem.id });
      await router.invalidate();
    } finally {
      setPending("none");
    }
  };

  return (
    <>
      <Menu>
        {/*
         * Ink on parchment, not the shell's own surface tokens. This button appears together with
         * the butter dither band and sits on it, so the surface underneath is known — which is
         * exactly the case ADR 0009 keeps the fixed ink/parchment pair for. A `bg-raised` chip
         * would track the shell theme and go pale-on-butter the moment the shell is in light mode.
         *
         * Revealed on hover so it stays off the artwork at rest. Touch has no hover, so below sm
         * it is always visible.
         */}
        <Menu.Trigger
          aria-label={`Actions for ${designSystem.name}`}
          className="relative inline-flex size-8 items-center justify-center rounded-(--radius-shell) bg-ink text-parchment opacity-0 ring-1 ring-ink/20 ring-inset hover:bg-ink/85 focus-visible:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-ink group-hover:opacity-100 data-popup-open:opacity-100 max-sm:opacity-100"
          disabled={pending === "duplicating"}
        >
          <HugeiconsIcon aria-hidden="true" icon={MoreHorizontalIcon} size={18} strokeWidth={2} />
          {/* Meets the 48px touch minimum without inflating the visible chip. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
          />
        </Menu.Trigger>

        <Menu.Popup className="min-w-44">
          <Menu.Item onClick={() => setRenaming(true)}>
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4 shrink-0"
              icon={PencilEdit02Icon}
              size={16}
              strokeWidth={2}
            />
            Rename
          </Menu.Item>
          <Menu.Item onClick={() => void duplicate()}>
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4 shrink-0"
              icon={Copy01Icon}
              size={16}
              strokeWidth={2}
            />
            Duplicate
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item onClick={() => setDeleting(true)} variant="danger">
            <HugeiconsIcon
              aria-hidden="true"
              className="size-4 shrink-0"
              icon={Delete02Icon}
              size={16}
              strokeWidth={2}
            />
            Delete
          </Menu.Item>
        </Menu.Popup>
      </Menu>

      <RenameDialog designSystem={designSystem} onOpenChange={setRenaming} open={renaming} />
      <DeleteDialog designSystem={designSystem} onOpenChange={setDeleting} open={deleting} />
    </>
  );
}

function RenameDialog({
  designSystem,
  onOpenChange,
  open,
}: {
  designSystem: DesignSystemCardData;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}): ReactElement {
  const router = useRouter();
  const [name, setName] = useState(designSystem.name);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState(false);

  const trimmed = name.trim();
  const unchanged = trimmed === designSystem.name;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!trimmed || unchanged) {
      onOpenChange(false);
      return;
    }

    setSaving(true);
    setConflict(false);
    try {
      const result = await renameDesignSystemFn({ data: { id: designSystem.id, name: trimmed } });
      await router.invalidate();
      /*
       * A conflict means the document moved under us — most often the owner has this system
       * open in the editor and autosaved. The refreshed card is the answer; say so and let
       * them try again rather than offering an overwrite, which belongs to the editor's own
       * draft reconciliation.
       */
      if (result.status === "conflict") {
        setConflict(true);
        return;
      }
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root
      onOpenChange={(next) => {
        if (next) {
          setName(designSystem.name);
          setConflict(false);
        }
        onOpenChange(next);
      }}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <div className={dialogViewportClass}>
          <Dialog.Popup className={`${dialogPanelClass} w-full max-w-100`}>
            <DialogHeader>
              <Dialog.Title className={dialogTitleClass}>Rename design system</Dialog.Title>
              <Dialog.Description className={dialogDescriptionClass}>
                The name is part of the design system document, so exports and generated guides
                follow it.
              </Dialog.Description>
            </DialogHeader>

            <form className="flex flex-col gap-4" onSubmit={(event) => void submit(event)}>
              <Input
                aria-label="Design system name"
                autoFocus
                fullWidth
                maxLength={80}
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
              {conflict ? (
                <p className="text-sm text-berry">
                  This design system changed somewhere else. The card has been refreshed — try
                  again.
                </p>
              ) : null}
              <DialogFooter>
                <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                <Button disabled={!trimmed || saving} loading={saving} type="submit">
                  Rename
                </Button>
              </DialogFooter>
            </form>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DeleteDialog({
  designSystem,
  onOpenChange,
  open,
}: {
  designSystem: DesignSystemCardData;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}): ReactElement {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const confirm = async () => {
    setDeleting(true);
    try {
      await deleteDesignSystemFn({ data: designSystem.id });
      await router.invalidate();
      onOpenChange(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog.Root onOpenChange={onOpenChange} open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={dialogBackdropClass} />
        <div className={dialogViewportClass}>
          <AlertDialog.Popup className={`${dialogPanelClass} w-full max-w-100`}>
            <DialogHeader>
              <AlertDialog.Title className={dialogTitleClass}>
                Delete {designSystem.name}?
              </AlertDialog.Title>
              <AlertDialog.Description className={dialogDescriptionClass}>
                This permanently deletes the design system and its document. Anything already
                exported into a repository keeps working; nothing else can be recovered.
              </AlertDialog.Description>
            </DialogHeader>

            <DialogFooter>
              <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
              <Button
                disabled={deleting}
                loading={deleting}
                onClick={() => void confirm()}
                variant="danger"
              >
                Delete
              </Button>
            </DialogFooter>
          </AlertDialog.Popup>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
