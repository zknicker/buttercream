import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

/*
 * Shell kit menu. Base UI behaviour, shell styling. The parts mirror the primitive
 * one-for-one so composition stays predictable at call sites.
 */

const ITEM = classes(
  "flex h-9 cursor-default items-center gap-2.5 rounded-(--radius-shell) px-2.5 text-sm text-fg outline-none select-none",
  "data-highlighted:bg-fg/6",
);

function MenuRoot(props: BaseMenu.Root.Props): ReactElement {
  return <BaseMenu.Root {...props} />;
}

function MenuTrigger({
  className,
  ...props
}: Omit<BaseMenu.Trigger.Props, "className"> & { className?: string }): ReactElement {
  return <BaseMenu.Trigger className={className} data-slot="menu-trigger" {...props} />;
}

export interface MenuPopupProps extends Omit<BaseMenu.Popup.Props, "className"> {
  align?: BaseMenu.Positioner.Props["align"];
  className?: string;
  sideOffset?: number;
}

function MenuPopup({
  align = "end",
  className,
  sideOffset = 8,
  ...props
}: MenuPopupProps): ReactElement {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner align={align} className="z-30" sideOffset={sideOffset}>
        <BaseMenu.Popup
          className={classes(
            "flex min-w-56 flex-col gap-1 rounded-xl bg-raised p-2 outline-none",
            "shadow-xl shadow-ink/10 ring-1 ring-line dark:shadow-none",
            "origin-(--transform-origin) transition duration-150",
            "data-starting-style:scale-98 data-starting-style:opacity-0",
            "data-ending-style:scale-98 data-ending-style:opacity-0",
            className,
          )}
          data-slot="menu-popup"
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export type MenuItemVariant = "default" | "danger";

export interface MenuItemProps extends Omit<BaseMenu.Item.Props, "className"> {
  className?: string;
  variant?: MenuItemVariant;
}

function MenuItem({ className, variant = "default", ...props }: MenuItemProps): ReactElement {
  return (
    <BaseMenu.Item
      className={classes(
        ITEM,
        variant === "danger" &&
          "text-berry data-highlighted:bg-berry/12 data-highlighted:text-berry",
        className,
      )}
      data-slot="menu-item"
      {...props}
    />
  );
}

function MenuGroup({
  className,
  ...props
}: Omit<BaseMenu.Group.Props, "className"> & { className?: string }): ReactElement {
  return <BaseMenu.Group className={classes("flex flex-col gap-0.5", className)} {...props} />;
}

function MenuGroupLabel({
  className,
  ...props
}: Omit<BaseMenu.GroupLabel.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.GroupLabel
      className={classes("px-2.5 pt-1.5 pb-0.5 text-xs font-medium text-muted", className)}
      {...props}
    />
  );
}

function MenuRadioGroup({
  className,
  ...props
}: Omit<BaseMenu.RadioGroup.Props, "className"> & { className?: string }): ReactElement {
  return <BaseMenu.RadioGroup className={classes("flex flex-col gap-0.5", className)} {...props} />;
}

function MenuRadioItem({
  className,
  ...props
}: Omit<BaseMenu.RadioItem.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseMenu.RadioItem
      className={classes(ITEM, "data-checked:bg-sunken data-checked:text-fg", className)}
      data-slot="menu-radio-item"
      {...props}
    />
  );
}

function MenuSeparator({
  className,
  ...props
}: Omit<BaseMenu.Separator.Props, "className"> & { className?: string }): ReactElement {
  return <BaseMenu.Separator className={classes("my-1 h-px bg-line", className)} {...props} />;
}

export const Menu = Object.assign(MenuRoot, {
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Item: MenuItem,
  Popup: MenuPopup,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: MenuSeparator,
  Trigger: MenuTrigger,
});
