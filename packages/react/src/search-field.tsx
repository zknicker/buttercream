"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ChangeEvent, ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { classes } from "./classes.ts";
import { CloseButton } from "./close-button.tsx";

interface SearchFieldContextValue {
  clearLabel: string;
  currentValue: string;
  defaultValue: string | undefined;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  value: string | undefined;
}

const SearchFieldContext = createContext<SearchFieldContextValue | null>(null);

function useSearchFieldContext(part: string): SearchFieldContextValue {
  const context = useContext(SearchFieldContext);
  if (context === null) {
    throw new Error(`SearchField.${part} must be rendered inside a SearchField.`);
  }
  return context;
}

export interface SearchFieldProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  children: ReactNode;
  className?: string;
  /** Label for the clear button, which is otherwise only a glyph. */
  clearLabel?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  onClear?: () => void;
  value?: string;
}

/**
 * A search input built from `Group`, `Input`, `SearchIcon`, and `ClearButton`.
 *
 * Unlike the reference, there is no built-in label or description slot: Buttercream pairs every
 * control with `Field` for that, and a second labelling path here would be a second way to get
 * the wiring wrong. The root owns value and empty-state tracking and hands it to its parts
 * through context, the same split as `NumberField`.
 */
function SearchFieldRoot({
  children,
  className,
  clearLabel = "Clear search",
  defaultValue,
  fullWidth = false,
  onClear,
  value,
  ...props
}: SearchFieldProps): ReactElement {
  /*
   * Tracked only to know whether the field is empty. A controlled `value` wins when given, so
   * this never competes with a caller that owns the state.
   */
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""));
  const currentValue = value === undefined ? internalValue : String(value);

  return (
    <SearchFieldContext.Provider
      value={{
        clearLabel,
        currentValue,
        defaultValue,
        onClear: () => {
          setInternalValue("");
          onClear?.();
        },
        onInputChange: (event) => setInternalValue(event.currentTarget.value),
        value,
      }}
    >
      <div
        className={classes("search-field", fullWidth && "search-field--full-width", className)}
        data-slot="search-field"
        {...props}
      >
        {children}
      </div>
    </SearchFieldContext.Provider>
  );
}

export interface SearchFieldGroupProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  className?: string;
}

/**
 * The bordered pill that holds the icon, input, and clear button. Disabled and invalid styling
 * both key off the input's own attributes via `:has()` rather than a prop threaded down —
 * `Input` is the element that actually carries `disabled`/`aria-invalid`.
 */
function SearchFieldGroup({ className, ...props }: SearchFieldGroupProps): ReactElement {
  const { currentValue } = useSearchFieldContext("Group");

  return (
    <div
      className={classes("search-field__group", className)}
      data-empty={currentValue === "" || undefined}
      data-slot="search-field-group"
      {...props}
    />
  );
}

export interface SearchFieldInputProps
  extends Omit<BaseInput.Props, "className" | "defaultValue" | "type" | "value"> {
  className?: string;
}

function SearchFieldInput({ className, onChange, ...props }: SearchFieldInputProps): ReactElement {
  const { defaultValue, onInputChange, value } = useSearchFieldContext("Input");

  return (
    <BaseInput
      className={classes("search-field__input", className)}
      data-slot="search-field-input"
      onChange={(event) => {
        onInputChange(event);
        onChange?.(event);
      }}
      type="search"
      {...(value === undefined ? { defaultValue } : { value })}
      {...props}
    />
  );
}

export interface SearchFieldSearchIconProps
  extends Omit<ComponentPropsWithoutRef<"span">, "className"> {
  children?: ReactNode;
  className?: string;
}

function SearchFieldSearchIcon({
  children,
  className,
  ...props
}: SearchFieldSearchIconProps): ReactElement {
  return (
    <span
      className={classes("search-field__icon", className)}
      data-slot="search-field-icon"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M10.25 10.25 13.5 13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      )}
    </span>
  );
}

export interface SearchFieldClearButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof CloseButton>, "className" | "label" | "onClick"> {
  className?: string;
  onClick?: () => void;
}

function SearchFieldClearButton({
  className,
  onClick,
  ...props
}: SearchFieldClearButtonProps): ReactElement {
  const { clearLabel, currentValue, onClear } = useSearchFieldContext("ClearButton");

  return (
    <CloseButton
      className={classes("search-field__clear", className)}
      data-slot="search-field-clear"
      label={clearLabel}
      onClick={() => {
        onClear();
        onClick?.();
      }}
      tabIndex={currentValue === "" ? -1 : undefined}
      {...props}
    />
  );
}

export const SearchField = Object.assign(SearchFieldRoot, {
  ClearButton: SearchFieldClearButton,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  SearchIcon: SearchFieldSearchIcon,
});
