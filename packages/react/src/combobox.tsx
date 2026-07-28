"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

/**
 * `Item` is what the list is built from and is inferred from `items`. It is separate from `Value`
 * because a grouped list is an array of groups: the child is handed a group, while the value the
 * field settles on is still one option out of one of them.
 */
export interface ComboboxProps<Value, Item>
  extends Omit<BaseCombobox.Root.Props<Value>, "children" | "items"> {
  /**
   * A function child receives each item that survived filtering, and is what you almost always
   * want. A plain node is accepted for lists that never filter.
   */
  children?: ReactNode | ((item: Item, index: number) => ReactNode);
  className?: string;
  /**
   * Where the popup is portalled. Defaults to the document body.
   *
   * Pass the element the theme tokens are set on whenever they are scoped to a subtree rather
   * than `:root`. Custom properties inherit through the DOM, not through React, so a popup
   * portalled to the body sits outside that subtree and silently falls back to the defaults —
   * the field restyles and the popup does not.
   */
  container?: BaseCombobox.Portal.Props["container"];
  /** Shown in the popup when the query matches nothing. */
  emptyMessage?: ReactNode;
  /** Replaces the chevron. The default one rotates when the popup is open; a custom one does not. */
  icon?: ReactNode;
  /** Drives filtering. Without it the field cannot filter, whatever the child renders. */
  items?: readonly Item[];
  placeholder?: string;
}

export interface ComboboxItemProps extends Omit<BaseCombobox.Item.Props, "className"> {
  className?: string;
}

export interface ComboboxGroupProps extends Omit<BaseCombobox.Group.Props, "className"> {
  className?: string;
  /** The heading above the group. */
  label: ReactNode;
}

/**
 * A text input that filters a list.
 *
 * Filtering is Base UI's, driven by the `items` prop: it matches on `contains`, case- and
 * accent-insensitively. That only works if the list is rendered *from* the filtered collection,
 * so pass a function child rather than a static list of items — a static list renders every
 * item regardless of the query, and the field silently stops filtering.
 *
 * ```tsx
 * <Combobox items={animals}>{(animal) => <Combobox.Item key={animal} value={animal}>{animal}</Combobox.Item>}</Combobox>
 * ```
 */
function ComboboxRoot<Value, Item = Value>({
  children,
  className,
  container,
  emptyMessage = "No results",
  icon,
  placeholder,
  ...props
}: ComboboxProps<Value, Item>): ReactElement {
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
            aria-label="Show suggestions"
            className="combobox__trigger"
            data-slot="combobox-trigger"
          >
            {icon ?? (
              <BaseCombobox.Icon className="combobox__chevron" data-slot="combobox-chevron" />
            )}
          </BaseCombobox.Trigger>
        </div>
      </div>
      <BaseCombobox.Portal container={container}>
        <BaseCombobox.Positioner
          className="combobox__positioner"
          data-slot="combobox-positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="combobox__popup" data-slot="combobox-popup">
            <BaseCombobox.Empty className="combobox__empty" data-slot="combobox-empty">
              {emptyMessage}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="combobox__list" data-slot="combobox-list">
              {children}
            </BaseCombobox.List>
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

/**
 * A titled run of items. Give the root grouped `items` — `[{ value, items }]` — and render one
 * of these per group, with a `Combobox.Collection` inside so the group's items filter too.
 */
function ComboboxGroup({ children, className, label, ...props }: ComboboxGroupProps): ReactElement {
  return (
    <BaseCombobox.Group
      className={classes("combobox__group", className)}
      data-slot="combobox-group"
      {...props}
    >
      <BaseCombobox.GroupLabel className="combobox__group-label" data-slot="combobox-group-label">
        {label}
      </BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
}

export const Combobox = Object.assign(ComboboxRoot, {
  Collection: BaseCombobox.Collection,
  Group: ComboboxGroup,
  Item: ComboboxItem,
});
