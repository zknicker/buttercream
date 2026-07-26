"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type TabsVariant = "primary" | "secondary";

export interface TabsProps extends Omit<BaseTabs.Root.Props, "className"> {
  className?: string;
  variant?: TabsVariant;
}

function TabsRoot({
  className,
  orientation = "horizontal",
  variant = "primary",
  ...props
}: TabsProps): ReactElement {
  return (
    <BaseTabs.Root
      className={classes("tabs", `tabs--${variant}`, className)}
      data-slot="tabs"
      orientation={orientation}
      {...props}
    />
  );
}

export interface TabsListProps extends Omit<BaseTabs.List.Props, "className"> {
  className?: string;
  separated?: boolean;
}

function TabsList({
  children,
  className,
  separated = false,
  ...props
}: TabsListProps): ReactElement {
  return (
    <BaseTabs.List
      className={classes("tabs__list", separated && "tabs__list--separated", className)}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <BaseTabs.Indicator className="tabs__indicator" data-slot="tabs-indicator" />
    </BaseTabs.List>
  );
}

function TabsTab({
  className,
  ...props
}: Omit<BaseTabs.Tab.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTabs.Tab className={classes("tabs__tab", className)} data-slot="tabs-tab" {...props} />
  );
}

function TabsPanel({
  className,
  ...props
}: Omit<BaseTabs.Panel.Props, "className"> & { className?: string }): ReactElement {
  return (
    <BaseTabs.Panel
      className={classes("tabs__panel", className)}
      data-slot="tabs-panel"
      {...props}
    />
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Panel: TabsPanel,
  Tab: TabsTab,
});
