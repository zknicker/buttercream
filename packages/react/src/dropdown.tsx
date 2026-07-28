"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export interface DropdownProps extends BaseMenu.Root.Props {}

export interface DropdownItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  className?: string;
  /** Marks a destructive action — delete, revoke, leave. */
  danger?: boolean;
}

/** A menu of actions hung off a trigger. */
function DropdownRoot(props: DropdownProps): ReactElement {
  return <BaseMenu.Root {...props} />;
}

function DropdownTrigger({
  className,
  ...props
}: Omit<BaseMenu.Trigger.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.Trigger
      className={classes("dropdown__trigger", className)}
      data-slot="dropdown-trigger"
      {...props}
    />
  );
}

export interface DropdownContentProps extends Omit<BaseMenu.Popup.Props, "className"> {
  align?: BaseMenu.Positioner.Props["align"];
  className?: string;
  /**
   * Where the menu is portalled. Defaults to the document body.
   *
   * Pass the element the theme tokens are set on whenever they are scoped to a subtree rather
   * than `:root`. Custom properties inherit through the DOM, not through React, so a menu
   * portalled to the body sits outside that subtree and silently falls back to the defaults —
   * the trigger restyles and the menu does not.
   *
   * Choose that element with care. A container that establishes containment or a new containing
   * block — `contain`, `container-type`, `transform`, `filter` — becomes the containing block for
   * fixed-position descendants, so a full-viewport backdrop will be confined to it. One that clips
   * or scrolls will cut off content extending past its edge. The nearest themed ancestor is
   * usually right; the nearest scroll container rarely is.
   */
  container?: BaseMenu.Portal.Props["container"];
  side?: BaseMenu.Positioner.Props["side"];
  sideOffset?: number;
}

/**
 * The portal, positioner and popup travel together — a caller assembling them by hand can put
 * the menu in the wrong stacking context, which is the usual cause of a menu clipped by its
 * own trigger's overflow.
 */
function DropdownContent({
  align = "start",
  children,
  className,
  container,
  side = "bottom",
  sideOffset = 6,
  ...props
}: DropdownContentProps): ReactElement {
  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner
        align={align}
        className="dropdown__positioner"
        data-slot="dropdown-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseMenu.Popup
          className={classes("dropdown__popup", className)}
          data-slot="dropdown-popup"
          {...props}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function DropdownItem({ className, danger = false, ...props }: DropdownItemProps): ReactElement {
  return (
    <BaseMenu.Item
      className={classes("dropdown__item", danger && "dropdown__item--danger", className)}
      data-slot="dropdown-item"
      {...props}
    />
  );
}

function DropdownGroup({
  className,
  ...props
}: Omit<BaseMenu.Group.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.Group
      className={classes("dropdown__group", className)}
      data-slot="dropdown-group"
      {...props}
    />
  );
}

function DropdownGroupLabel({
  className,
  ...props
}: Omit<BaseMenu.GroupLabel.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.GroupLabel
      className={classes("dropdown__group-label", className)}
      data-slot="dropdown-group-label"
      {...props}
    />
  );
}

function DropdownSeparator({
  className,
  ...props
}: Omit<BaseMenu.Separator.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.Separator
      className={classes("dropdown__separator", className)}
      data-slot="dropdown-separator"
      {...props}
    />
  );
}

export const Dropdown = Object.assign(DropdownRoot, {
  Content: DropdownContent,
  Group: DropdownGroup,
  GroupLabel: DropdownGroupLabel,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  Trigger: DropdownTrigger,
});
