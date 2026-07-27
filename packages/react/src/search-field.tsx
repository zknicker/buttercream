"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import type { ReactElement } from "react";
import { useState } from "react";
import { classes } from "./classes.ts";
import { CloseButton } from "./close-button.tsx";

export interface SearchFieldProps extends Omit<BaseInput.Props, "className" | "type"> {
  className?: string;
  /** Label for the clear button, which is otherwise only a glyph. */
  clearLabel?: string;
  fullWidth?: boolean;
  onClear?: () => void;
}

/**
 * A search input with a leading icon and a clear button.
 *
 * Unlike the reference, this is the control alone rather than control-plus-label: Buttercream
 * pairs every control with `Field` for its label and description, and a second labelling path
 * here would be a second way to get the wiring wrong.
 */
export function SearchField({
  className,
  clearLabel = "Clear search",
  defaultValue,
  fullWidth = false,
  onChange,
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
    <div
      className={classes("search-field", fullWidth && "search-field--full-width", className)}
      data-empty={currentValue === "" || undefined}
      data-slot="search-field"
    >
      <svg
        aria-hidden="true"
        className="search-field__icon"
        data-slot="search-field-icon"
        fill="none"
        role="presentation"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <BaseInput
        className="search-field__input"
        data-slot="search-field-input"
        onChange={(event) => {
          setInternalValue(event.currentTarget.value);
          onChange?.(event);
        }}
        type="search"
        {...(value === undefined ? { defaultValue } : { value })}
        {...props}
      />
      <CloseButton
        className="search-field__clear"
        data-slot="search-field-clear"
        label={clearLabel}
        onClick={() => {
          setInternalValue("");
          onClear?.();
        }}
        tabIndex={currentValue === "" ? -1 : undefined}
      />
    </div>
  );
}
