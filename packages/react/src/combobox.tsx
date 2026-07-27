"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

export interface ComboboxProps<Value> extends BaseCombobox.Root.Props<Value> {
  className?: string;
  /** Shown in the popup when the query matches nothing. */
  emptyMessage?: ReactNode;
  placeholder?: string;
}

export interface ComboboxItemProps extends Omit<BaseCombobox.Item.Props, "className"> {
  className?: string;
}

/**
 * A text input that filters a list. Base UI owns the filtering, the highlight and the popup
 * lifecycle; this adds the design system's field treatment and pairs the parts so the popup
 * always lands in a portal rather than inside whatever overflow the input happens to sit in.
 */
function ComboboxRoot<Value>({
  children,
  className,
  emptyMessage = "No results",
  placeholder,
  ...props
}: ComboboxProps<Value>): ReactElement {
  return (
    <BaseCombobox.Root {...props}>
      <div className={classes("combobox", className)} data-slot="combobox">
        <div className="combobox__control" data-slot="combobox-control">
          <BaseCombobox.Input
            className="combobox__input"
            data-slot="combobox-input"
            placeholder={placeholder}
          />
          <BaseCombobox.Trigger
            aria-label="Open"
            className="combobox__trigger"
            data-slot="combobox-trigger"
          >
            <span aria-hidden className="combobox__chevron" />
          </BaseCombobox.Trigger>
        </div>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="combobox__positioner"
          data-slot="combobox-positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="combobox__popup" data-slot="combobox-popup">
            <BaseCombobox.Empty className="combobox__empty" data-slot="combobox-empty">
              {emptyMessage}
            </BaseCombobox.Empty>
            <BaseCombobox.List>{children}</BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

function ComboboxItem({ children, className, ...props }: ComboboxItemProps): ReactElement {
  return (
    <BaseCombobox.Item
      className={classes("combobox__item", className)}
      data-slot="combobox-item"
      {...props}
    >
      <span className="combobox__item-text">{children}</span>
      <BaseCombobox.ItemIndicator
        className="combobox__item-indicator"
        data-slot="combobox-item-indicator"
      >
        <span aria-hidden className="combobox__check" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

export const Combobox = Object.assign(ComboboxRoot, {
  Item: ComboboxItem,
});
