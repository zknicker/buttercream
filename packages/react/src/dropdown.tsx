"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";
import { classes } from "./classes.ts";
import { Kbd } from "./kbd.tsx";

export interface DropdownProps extends BaseMenu.Root.Props {}

/**
 * True inside a submenu. Content reads it to fly the nested menu out beside its trigger
 * instead of dropping it below, which is the placement the root menu wants.
 */
const DropdownSubmenuContext = createContext(false);

export interface DropdownItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  className?: string;
  /** Marks a destructive action — delete, revoke, leave. */
  danger?: boolean;
  /** A second, quieter line under the label. */
  description?: ReactNode;
  /**
   * The chord that runs this item, parked at the end of the row. Pass the keys as text —
   * `shortcut="⌘ ⇧ N"` — the `<kbd>` around them is supplied.
   */
  shortcut?: ReactNode;
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
  alignOffset?: number;
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
 *
 * The same part serves a submenu; only the placement defaults differ, and a submenu picks
 * those up from its enclosing `Dropdown.Submenu`.
 */
function DropdownContent({
  align = "start",
  alignOffset,
  children,
  className,
  container,
  side,
  sideOffset,
  ...props
}: DropdownContentProps): ReactElement {
  const submenu = useContext(DropdownSubmenuContext);

  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner
        align={align}
        /* Pulled back by the popup's own padding so a submenu's first row meets its trigger. */
        alignOffset={alignOffset ?? (submenu ? -6 : 0)}
        className="dropdown__positioner"
        data-slot="dropdown-positioner"
        side={side ?? (submenu ? "inline-end" : "bottom")}
        sideOffset={sideOffset ?? (submenu ? 4 : 6)}
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

/**
 * Children stay on the label line, so an icon passed as the first child still sits beside the
 * label rather than above the description. Undescribed rows are left flat: wrapping every item
 * would push a leading icon into a column of its own.
 */
function DropdownItemBody({
  children,
  description,
  shortcut,
}: {
  children?: ReactNode;
  description?: ReactNode;
  shortcut?: ReactNode;
}): ReactElement {
  return (
    <>
      {description === undefined ? (
        children
      ) : (
        <span className="dropdown__item-text" data-slot="dropdown-item-text">
          <span className="dropdown__item-label">{children}</span>
          <span className="dropdown__item-description" data-slot="dropdown-item-description">
            {description}
          </span>
        </span>
      )}
      {shortcut === undefined ? null : <Kbd className="dropdown__item-shortcut">{shortcut}</Kbd>}
    </>
  );
}

function DropdownItem({
  children,
  className,
  danger = false,
  description,
  shortcut,
  ...props
}: DropdownItemProps): ReactElement {
  return (
    <BaseMenu.Item
      className={classes("dropdown__item", danger && "dropdown__item--danger", className)}
      data-slot="dropdown-item"
      {...props}
    >
      <DropdownItemBody description={description} shortcut={shortcut}>
        {children}
      </DropdownItemBody>
    </BaseMenu.Item>
  );
}

export interface DropdownSubmenuProps extends BaseMenu.SubmenuRoot.Props {}

/** Groups a nested menu: the SubmenuTrigger that opens it and the Content it opens. */
function DropdownSubmenu(props: DropdownSubmenuProps): ReactElement {
  return (
    <DropdownSubmenuContext.Provider value={true}>
      <BaseMenu.SubmenuRoot {...props} />
    </DropdownSubmenuContext.Provider>
  );
}

export interface DropdownSubmenuTriggerProps
  extends Omit<BaseMenu.SubmenuTrigger.Props, "className"> {
  className?: string;
  /** A second, quieter line under the label. */
  description?: ReactNode;
  /** Replaces the chevron. */
  indicator?: ReactNode;
}

/**
 * A row that opens a nested menu. It carries no shortcut slot — the end of the row belongs to
 * the chevron, and a submenu is not itself an action a chord can run.
 */
function DropdownSubmenuTrigger({
  children,
  className,
  description,
  indicator,
  ...props
}: DropdownSubmenuTriggerProps): ReactElement {
  return (
    <BaseMenu.SubmenuTrigger
      className={classes("dropdown__item dropdown__submenu-trigger", className)}
      data-slot="dropdown-submenu-trigger"
      {...props}
    >
      <DropdownItemBody description={description}>{children}</DropdownItemBody>
      <span
        aria-hidden="true"
        className="dropdown__submenu-indicator"
        data-slot="dropdown-submenu-indicator"
      >
        {indicator ?? (
          <svg
            aria-hidden="true"
            fill="none"
            role="presentation"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m6 4 4 4-4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        )}
      </span>
    </BaseMenu.SubmenuTrigger>
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
  Submenu: DropdownSubmenu,
  SubmenuTrigger: DropdownSubmenuTrigger,
  Trigger: DropdownTrigger,
});
