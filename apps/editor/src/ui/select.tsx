import { Select as BaseSelect } from "@base-ui/react/select";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon";
import Tick02Icon from "@hugeicons-pro/core-stroke-rounded/Tick02Icon";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

/*
 * Shell kit select. Base UI behaviour, shell styling.
 *
 * This replaces a native `<select>`, which handed the studio's most-used control to the operating
 * system: a different popup on every platform, none of them able to take the shell's type, radius,
 * or surface. The parts mirror the published Select one-for-one so the eventual swap to
 * @buttercream/react is an import change.
 */

const ITEM = classes(
  "flex h-8 cursor-default items-center gap-2 rounded-(--radius-shell-sm) pr-2 pl-7 text-[13px] text-fg outline-none select-none",
  "data-highlighted:bg-fg/6",
);

export interface SelectProps<Value> extends Omit<BaseSelect.Root.Props<Value>, "children"> {
  /** Names the trigger. The row's visible label is not a `<label>` — a label wrapping a custom
   *  trigger swallows the clicks that should open it — so the name is passed here instead. */
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
  /** Rendered inside the trigger when nothing is selected. */
  placeholder?: string;
}

function SelectRoot<Value>({
  "aria-label": ariaLabel,
  children,
  className,
  placeholder,
  ...props
}: SelectProps<Value>): ReactElement {
  return (
    <BaseSelect.Root {...props}>
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        className={classes(
          "flex h-7 min-w-0 cursor-pointer items-center justify-end gap-1 rounded-(--radius-shell-sm) pr-1 pl-2",
          "font-mono text-xs text-muted outline-none",
          "hover:bg-fg/5 data-popup-open:bg-fg/5",
          "focus-visible:outline-[1.5px] focus-visible:-outline-offset-1 focus-visible:outline-fg",
          "data-disabled:cursor-default data-disabled:opacity-60 data-disabled:hover:bg-transparent",
          className,
        )}
        data-slot="select-trigger"
      >
        <BaseSelect.Value className="truncate" placeholder={placeholder} />
        <BaseSelect.Icon className="shrink-0">
          <HugeiconsIcon aria-hidden="true" icon={ArrowDown01Icon} size={14} strokeWidth={2} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          align="end"
          className="z-30"
          /*
           * Anchored rather than overlaying the trigger. Base UI can align the selected item over
           * the trigger the way a native macOS menu does, but in a rail this narrow that lands the
           * popup on top of the row you are editing, which hides the thing you are changing.
           */
          alignItemWithTrigger={false}
          sideOffset={6}
        >
          <BaseSelect.Popup
            className={classes(
              "max-h-[min(24rem,var(--available-height))] min-w-[max(8rem,var(--anchor-width))] overflow-y-auto overscroll-contain",
              "rounded-(--radius-shell) bg-raised p-1 ring-1 ring-fg/10",
              "shadow-xl shadow-ink/10 dark:shadow-none",
              "origin-(--transform-origin) transition-[opacity,transform] duration-100 ease-out",
              "data-starting-style:scale-98 data-starting-style:opacity-0",
              "data-ending-style:scale-98 data-ending-style:opacity-0",
              "motion-reduce:transition-none",
            )}
            data-slot="select-popup"
          >
            {children}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function SelectItem({
  children,
  className,
  ...props
}: Omit<BaseSelect.Item.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSelect.Item className={classes(ITEM, className)} data-slot="select-item" {...props}>
      {/*
       * The tick sits in the padding the row already reserves, so selecting an option does not
       * reflow the list — the checked and unchecked rows have identical text positions.
       */}
      <BaseSelect.ItemIndicator className="absolute left-2 flex items-center">
        <HugeiconsIcon aria-hidden="true" icon={Tick02Icon} size={13} strokeWidth={2.5} />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className="truncate">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectGroup({
  className,
  ...props
}: Omit<BaseSelect.Group.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSelect.Group className={className} data-slot="select-group" {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: Omit<BaseSelect.GroupLabel.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseSelect.GroupLabel
      className={classes("px-2 pt-2 pb-1 font-mono text-[11px] text-muted", className)}
      data-slot="select-group-label"
      {...props}
    />
  );
}

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
});
