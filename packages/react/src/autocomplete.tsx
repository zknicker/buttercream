"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";
import { ErrorMessage } from "./error-message.tsx";
import { Spinner } from "./spinner.tsx";

export type AutocompleteSize = "sm" | "md" | "lg";

export type AutocompleteVariant = "primary" | "secondary";

export interface AutocompleteProps<
  Value,
  Item = Value,
  Multiple extends boolean | undefined = false,
> extends Omit<BaseCombobox.Root.Props<Value, Multiple>, "children" | "items"> {
  children?: ReactNode | ((item: Item, index: number) => ReactNode);
  /** Adds a button that empties the field. It is only rendered while there is something to clear. */
  clearable?: boolean;
  className?: string;
  /** Announced on the clear button, which is otherwise only a glyph. */
  clearLabel?: string;
  /** Where the popup is portalled. Pass the themed subtree when tokens are scoped to one. */
  container?: BaseCombobox.Portal.Props["container"];
  description?: ReactNode;
  /** Shown in the popup when the query matches nothing. */
  emptyMessage?: ReactNode;
  /** Rendered under the field while `invalid`. Replaces the description, which is hidden. */
  errorMessage?: ReactNode;
  fullWidth?: boolean;
  /** Replaces the chevron. The default one rotates when the popup is open; a custom one does not. */
  icon?: ReactNode;
  invalid?: boolean;
  items?: readonly Item[];
  label?: ReactNode;
  /** Swaps the chevron for the shared Spinner. The list stays usable while it spins. */
  loading?: boolean;
  /** Sits in the trigger before anything is chosen. */
  placeholder?: ReactNode;
  /** Announced on a chip's remove button. Receives the chip's text. */
  removeLabel?: (label: string) => string;
  searchPlaceholder?: string;
  size?: AutocompleteSize;
  /** Announced on the button that opens the popup in multiple mode. */
  triggerLabel?: string;
  variant?: AutocompleteVariant;
}

/*
 * Chips need a string for a value the caller may have modelled as an object. This mirrors Base
 * UI's own default — `{ value, label }` items display their label — for anything the caller has
 * not covered with `itemToStringLabel`.
 */
function itemLabel(value: unknown): string {
  if (typeof value === "object" && value !== null && "label" in value) {
    return String((value as { label: unknown }).label);
  }
  return String(value);
}

/*
 * Clear and ChipRemove render their own buttons, so the glyph is inlined here rather than
 * reused from CloseButton. It is the same path.
 */
function DismissIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4 4 12M4 4l8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * A select whose list you can search.
 *
 * The difference from Combobox is where the typing happens: Combobox is a text field that
 * filters as you type, while this shows the chosen value in a closed trigger and puts the search
 * inside the popup. Reach for it when the value is picked from a list rather than typed, and the
 * list is long enough that scrolling it is a chore.
 *
 * `multiple` changes that shape, because chips and a closed trigger cannot both hold the value:
 * the field becomes the chips and the query is typed among them, so the popup carries no search
 * of its own.
 */
export function Autocomplete<Value, Item = Value, Multiple extends boolean | undefined = false>({
  children,
  className,
  clearLabel = "Clear selection",
  clearable = false,
  container,
  description,
  emptyMessage = "No results",
  errorMessage,
  fullWidth = false,
  icon,
  invalid = false,
  label,
  loading = false,
  multiple,
  placeholder,
  removeLabel = (value) => `Remove ${value}`,
  searchPlaceholder = "Search…",
  size = "md",
  triggerLabel = "Show suggestions",
  variant = "primary",
  ...props
}: AutocompleteProps<Value, Item, Multiple>): ReactElement {
  const descriptionId = useId();
  const errorId = useId();
  const showError = invalid && errorMessage !== undefined;
  const describedBy =
    classes(
      description === undefined || showError ? undefined : descriptionId,
      showError && errorId,
    ) || undefined;

  const resolveLabel = props.itemToStringLabel ?? (itemLabel as (value: Value) => string);
  /* The chips input takes an attribute; a node placeholder only ever reaches the trigger. */
  const inputPlaceholder = typeof placeholder === "string" ? placeholder : undefined;

  const indicator = loading ? (
    <Spinner className="autocomplete__spinner" label={null} size="sm" />
  ) : (
    (icon ?? (
      // Empty children on purpose: Base UI's icon falls back to a ▼ character, and the chevron
      // is drawn in CSS.
      <BaseCombobox.Icon className="autocomplete__chevron" data-slot="autocomplete-chevron">
        {null}
      </BaseCombobox.Icon>
    ))
  );

  const clear = clearable ? (
    <BaseCombobox.Clear
      aria-label={clearLabel}
      className="autocomplete__clear"
      data-slot="autocomplete-clear"
    >
      <DismissIcon />
    </BaseCombobox.Clear>
  ) : null;

  return (
    <BaseCombobox.Root multiple={multiple} {...props}>
      <div
        className={classes(
          "autocomplete",
          variant === "secondary" && "autocomplete--secondary",
          size !== "md" && `autocomplete--${size}`,
          multiple && "autocomplete--multiple",
          invalid && "autocomplete--invalid",
          fullWidth && "autocomplete--full-width",
          className,
        )}
        data-slot="autocomplete"
      >
        {label === undefined ? null : (
          <BaseCombobox.Label className="autocomplete__label">{label}</BaseCombobox.Label>
        )}
        {multiple ? (
          <BaseCombobox.Chips className="autocomplete__chips" data-slot="autocomplete-chips">
            <BaseCombobox.Value>
              {(selected: Value[]) =>
                selected.map((value) => {
                  const text = resolveLabel(value);

                  return (
                    <BaseCombobox.Chip
                      className="autocomplete__chip"
                      data-slot="autocomplete-chip"
                      key={text}
                    >
                      {text}
                      <BaseCombobox.ChipRemove
                        aria-label={removeLabel(text)}
                        className="autocomplete__chip-remove"
                        data-slot="autocomplete-chip-remove"
                      >
                        <DismissIcon />
                      </BaseCombobox.ChipRemove>
                    </BaseCombobox.Chip>
                  );
                })
              }
            </BaseCombobox.Value>
            <BaseCombobox.Input
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
              className="autocomplete__chips-input"
              data-slot="autocomplete-input"
              placeholder={inputPlaceholder}
            />
            {clear}
            <BaseCombobox.Trigger
              aria-label={triggerLabel}
              className="autocomplete__toggle"
              data-slot="autocomplete-toggle"
            >
              {indicator}
            </BaseCombobox.Trigger>
          </BaseCombobox.Chips>
        ) : (
          <div
            className={classes(
              "autocomplete__control",
              clearable && "autocomplete__control--clearable",
            )}
            data-slot="autocomplete-control"
          >
            <BaseCombobox.Trigger
              aria-describedby={describedBy}
              aria-invalid={invalid || undefined}
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
                      resolveLabel(value as Value)
                    )
                  }
                </BaseCombobox.Value>
              </span>
              {indicator}
            </BaseCombobox.Trigger>
            {clear}
          </div>
        )}
        {description === undefined || showError ? null : (
          <span className="autocomplete__description" id={descriptionId}>
            {description}
          </span>
        )}
        {showError ? (
          <ErrorMessage className="autocomplete__error" id={errorId}>
            {errorMessage}
          </ErrorMessage>
        ) : null}
      </div>
      <BaseCombobox.Portal container={container}>
        <BaseCombobox.Positioner
          className="autocomplete__positioner"
          data-slot="autocomplete-positioner"
          sideOffset={6}
        >
          <BaseCombobox.Popup
            className={classes(
              "autocomplete__popup",
              size !== "md" && `autocomplete__popup--${size}`,
            )}
            data-slot="autocomplete-popup"
          >
            {multiple ? null : (
              <div className="autocomplete__search" data-slot="autocomplete-search">
                <span aria-hidden className="autocomplete__search-icon" />
                <BaseCombobox.Input
                  className="autocomplete__input"
                  data-slot="autocomplete-input"
                  placeholder={searchPlaceholder}
                />
              </div>
            )}
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

export interface AutocompleteGroupProps extends Omit<BaseCombobox.Group.Props, "className"> {
  className?: string;
  /** The heading above the group. */
  label: ReactNode;
}

/**
 * A titled run of items. Give the root grouped `items` — `[{ value, items }]` — and render one
 * of these per group, with an `Autocomplete.Collection` inside so the group's items filter too.
 */
function AutocompleteGroup({
  children,
  className,
  label,
  ...props
}: AutocompleteGroupProps): ReactElement {
  return (
    <BaseCombobox.Group
      className={classes("autocomplete__group", className)}
      data-slot="autocomplete-group"
      {...props}
    >
      <BaseCombobox.GroupLabel
        className="autocomplete__group-label"
        data-slot="autocomplete-group-label"
      >
        {label}
      </BaseCombobox.GroupLabel>
      {children}
    </BaseCombobox.Group>
  );
}

Autocomplete.Collection = BaseCombobox.Collection;
Autocomplete.Group = AutocompleteGroup;
Autocomplete.Item = AutocompleteItem;
