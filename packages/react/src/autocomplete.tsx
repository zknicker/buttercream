"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export interface AutocompleteProps<Value, Item>
  extends Omit<BaseCombobox.Root.Props<Value>, "children" | "items"> {
  children?: ReactNode | ((item: Item, index: number) => ReactNode);
  className?: string;
  /** Where the popup is portalled. Pass the themed subtree when tokens are scoped to one. */
  container?: BaseCombobox.Portal.Props["container"];
  description?: ReactNode;
  /** Shown in the popup when the query matches nothing. */
  emptyMessage?: ReactNode;
  items?: readonly Item[];
  label?: ReactNode;
  /** Sits in the trigger before anything is chosen. */
  placeholder?: ReactNode;
  searchPlaceholder?: string;
}

/**
 * A select whose list you can search.
 *
 * The difference from Combobox is where the typing happens: Combobox is a text field that
 * filters as you type, while this shows the chosen value in a closed trigger and puts the search
 * inside the popup. Reach for it when the value is picked from a list rather than typed, and the
 * list is long enough that scrolling it is a chore.
 */
export function Autocomplete<Value, Item = Value>({
  children,
  className,
  container,
  description,
  emptyMessage = "No results",
  label,
  placeholder,
  searchPlaceholder = "Search…",
  ...props
}: AutocompleteProps<Value, Item>): ReactElement {
  const descriptionId = useId();

  return (
    <BaseCombobox.Root {...props}>
      <div className={classes("autocomplete", className)} data-slot="autocomplete">
        {label === undefined ? null : (
          <BaseCombobox.Label className="autocomplete__label">{label}</BaseCombobox.Label>
        )}
        <BaseCombobox.Trigger
          aria-describedby={description === undefined ? undefined : descriptionId}
          className="autocomplete__trigger"
          data-slot="autocomplete-trigger"
        >
          {/* Value renders no element of its own, so the span carries the styling. */}
          <span className="autocomplete__value" data-slot="autocomplete-value">
            <BaseCombobox.Value>
              {(value: unknown) =>
                value === null || value === undefined || value === "" ? (
                  <span className="autocomplete__placeholder">{placeholder}</span>
                ) : (
                  String(value)
                )
              }
            </BaseCombobox.Value>
          </span>
          <BaseCombobox.Icon className="autocomplete__chevron" data-slot="autocomplete-chevron" />
        </BaseCombobox.Trigger>
        {description === undefined ? null : (
          <span className="autocomplete__description" id={descriptionId}>
            {description}
          </span>
        )}
      </div>
      <BaseCombobox.Portal container={container}>
        <BaseCombobox.Positioner
          className="autocomplete__positioner"
          data-slot="autocomplete-positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup className="autocomplete__popup" data-slot="autocomplete-popup">
            <div className="autocomplete__search" data-slot="autocomplete-search">
              <span aria-hidden className="autocomplete__search-icon" />
              <BaseCombobox.Input
                className="autocomplete__input"
                data-slot="autocomplete-input"
                placeholder={searchPlaceholder}
              />
            </div>
            <BaseCombobox.Empty className="autocomplete__empty" data-slot="autocomplete-empty">
              {emptyMessage}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="autocomplete__list" data-slot="autocomplete-list">
              {children}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}

export interface AutocompleteItemProps extends Omit<BaseCombobox.Item.Props, "className"> {
  className?: string;
}

function AutocompleteItem({ children, className, ...props }: AutocompleteItemProps): ReactElement {
  return (
    <BaseCombobox.Item
      className={classes("autocomplete__item", className)}
      data-slot="autocomplete-item"
      {...props}
    >
      <span className="autocomplete__item-text">{children}</span>
      <BaseCombobox.ItemIndicator
        className="autocomplete__item-indicator"
        data-slot="autocomplete-item-indicator"
      >
        <span aria-hidden className="autocomplete__check" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

Autocomplete.Item = AutocompleteItem;
