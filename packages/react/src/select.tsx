"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import { classes } from "./classes.ts";

export interface SelectProps<Value, Multiple extends boolean | undefined = false>
  extends Omit<BaseSelect.Root.Props<Value, Multiple>, "children"> {
  children: ReactNode;
  className?: string;
  /**
   * Where the popup is portalled. Defaults to the document body.
   *
   * Pass the element the theme tokens are set on whenever they are scoped to a subtree rather
   * than `:root`. Custom properties inherit through the DOM, not through React, so a popup
   * portalled to the body sits outside that subtree and silently falls back to the defaults —
   * the trigger restyles and the popup does not.
   *
   * Choose that element with care. A container that establishes containment or a new containing
   * block — `contain`, `container-type`, `transform`, `filter` — becomes the containing block for
   * fixed-position descendants, so a full-viewport backdrop will be confined to it. One that clips
   * or scrolls will cut off content extending past its edge. The nearest themed ancestor is
   * usually right; the nearest scroll container rarely is.
   */
  container?: BaseSelect.Portal.Props["container"];
  description?: ReactNode;
  indicator?: ReactNode;
  label: ReactNode;
  placeholder?: ReactNode;
}

function SelectRoot<Value, Multiple extends boolean | undefined = false>({
  children,
  className,
  container,
  description,
  indicator,
  label,
  placeholder,
  ...props
}: SelectProps<Value, Multiple>): ReactElement {
  const descriptionId = useId();

  return (
    <div className={classes("select", className)} data-slot="select">
      <BaseSelect.Root {...props}>
        <BaseSelect.Label className="select__label" data-slot="select-label">
          {label}
        </BaseSelect.Label>
        <BaseSelect.Trigger
          aria-describedby={description === undefined ? undefined : descriptionId}
          className="select__trigger"
          data-slot="select-trigger"
        >
          <BaseSelect.Value
            className="select__value"
            data-slot="select-value"
            placeholder={placeholder}
          />
          <BaseSelect.Icon className="select__icon" data-slot="select-icon">
            {indicator ?? <span aria-hidden="true" className="select__chevron" />}
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        {description === undefined ? null : (
          <div className="select__description" id={descriptionId}>
            {description}
          </div>
        )}
        <BaseSelect.Portal container={container}>
          <BaseSelect.Positioner
            alignItemWithTrigger={false}
            className="select__positioner"
            data-slot="select-positioner"
            sideOffset={4}
          >
            <BaseSelect.Popup className="select__popup" data-slot="select-popup">
              <BaseSelect.ScrollUpArrow className="select__scroll-arrow select__scroll-arrow--up">
                <span aria-hidden="true" className="select__scroll-chevron" />
              </BaseSelect.ScrollUpArrow>
              <BaseSelect.List className="select__list" data-slot="select-list">
                {children}
              </BaseSelect.List>
              <BaseSelect.ScrollDownArrow className="select__scroll-arrow select__scroll-arrow--down">
                <span aria-hidden="true" className="select__scroll-chevron" />
              </BaseSelect.ScrollDownArrow>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
}

export interface SelectItemProps extends Omit<BaseSelect.Item.Props, "children" | "className"> {
  children: ReactNode;
  className?: string;
  indicator?: ReactNode;
}

function SelectItem({ children, className, indicator, ...props }: SelectItemProps): ReactElement {
  return (
    <BaseSelect.Item
      className={classes("select__item", className)}
      data-slot="select-item"
      {...props}
    >
      <BaseSelect.ItemText className="select__item-text">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="select__item-indicator">
        {indicator ?? <span aria-hidden="true" className="select__check" />}
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

function SelectGroup({
  className,
  ...props
}: Omit<BaseSelect.Group.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSelect.Group className={classes("select__group", className)} {...props} />;
}

function SelectGroupLabel({
  className,
  ...props
}: Omit<BaseSelect.GroupLabel.Props, "className"> & { className?: string }): ReactElement {
  return <BaseSelect.GroupLabel className={classes("select__group-label", className)} {...props} />;
}

export const Select = Object.assign(SelectRoot, {
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
});
