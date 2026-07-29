"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "./button.tsx";
import { Chip } from "./chip.tsx";
import { classes } from "./classes.ts";
import { Drawer } from "./drawer.tsx";
import { Separator, type SeparatorProps } from "./separator.tsx";
import { Skeleton } from "./skeleton.tsx";
import { Tooltip, type TooltipContentProps } from "./tooltip.tsx";

/*
 * Adapted from shadcn/ui's Base UI sidebar: the same provider contract, collapse modes, rail,
 * and menu anatomy, rebuilt on Buttercream primitives — Drawer for the mobile sheet, Tooltip
 * for the collapsed rail labels, Button for the trigger — and styled by the sidebar BEM block
 * in @buttercream/styles instead of utilities.
 */

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const MOBILE_QUERY = "(max-width: 767px)";

export type SidebarState = "expanded" | "collapsed";
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

interface SidebarContextValue {
  isMobile: boolean;
  open: boolean;
  openMobile: boolean;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  state: SidebarState;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar.Provider.");
  }
  return context;
}

/* SSR renders the desktop sidebar; the swap to the drawer happens only once a client knows. */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = ({ matches }: MediaQueryListEvent | MediaQueryList) => setIsMobile(matches);
    sync(query);
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export interface SidebarProviderProps extends ComponentPropsWithoutRef<"div"> {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

function SidebarProvider({
  children,
  className,
  defaultOpen = true,
  onOpenChange,
  open: openProp,
  ...props
}: SidebarProviderProps): ReactElement {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (onOpenChange) {
        onOpenChange(next);
      } else {
        setUncontrolledOpen(next);
      }
      /* Persisted so a server can read the cookie and pass it back as defaultOpen. */
      // biome-ignore lint/suspicious/noDocumentCookie: a plain cookie write is the whole persistence contract; the async CookieStore is unavailable in Safari.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current);
    } else {
      setOpen(!open);
    }
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const state: SidebarState = open ? "expanded" : "collapsed";

  const value = useMemo<SidebarContextValue>(
    () => ({ isMobile, open, openMobile, setOpen, setOpenMobile, state, toggleSidebar }),
    [isMobile, open, openMobile, setOpen, state, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={classes("sidebar-provider", className)}
        data-slot="sidebar-provider"
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends ComponentPropsWithoutRef<"div"> {
  collapsible?: SidebarCollapsible;
  /**
   * Where the mobile drawer and collapsed-rail tooltips are portalled. Pass the element the
   * theme tokens are set on whenever they are scoped to a subtree rather than `:root`.
   */
  portalContainer?: HTMLElement | null;
  side?: SidebarSide;
  variant?: SidebarVariant;
}

function SidebarRoot({
  children,
  className,
  collapsible = "offcanvas",
  portalContainer,
  side = "left",
  variant = "sidebar",
  ...props
}: SidebarProps): ReactElement {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

  if (collapsible === "none") {
    return (
      <div className={classes("sidebar sidebar--static", className)} data-slot="sidebar" {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Drawer onOpenChange={setOpenMobile} open={openMobile}>
        <Drawer.Portal container={portalContainer}>
          <Drawer.Backdrop />
          <Drawer.Content placement={side}>
            <Drawer.Dialog
              className={classes("sidebar sidebar--mobile", className)}
              data-slot="sidebar"
              {...props}
            >
              <Drawer.Heading className="sidebar__a11y">Sidebar</Drawer.Heading>
              <Drawer.Description className="sidebar__a11y">
                Displays the mobile sidebar.
              </Drawer.Description>
              {children}
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
    );
  }

  return (
    <div
      className="sidebar"
      data-collapsible={state === "collapsed" ? collapsible : undefined}
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
    >
      {/* Holds the sidebar's place in flow; the fixed container below paints over it. */}
      <div aria-hidden className="sidebar__gap" data-slot="sidebar-gap" />
      <div
        className={classes("sidebar__container", className)}
        data-slot="sidebar-container"
        {...props}
      >
        <div className="sidebar__inner" data-slot="sidebar-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export interface SidebarTriggerProps extends ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
}

function SidebarTrigger({ children, className, onClick, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      aria-label="Toggle sidebar"
      className={classes("sidebar__trigger", className)}
      data-slot="sidebar-trigger"
      iconOnly
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      size="sm"
      variant="ghost"
      {...props}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect height="18" rx="2" width="18" x="3" y="3" />
          <path d="M9 3v18" />
        </svg>
      )}
    </Button>
  );
}

function SidebarRail({ className, ...props }: ComponentPropsWithoutRef<"button">): ReactElement {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      aria-label="Toggle sidebar"
      className={classes("sidebar__rail", className)}
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle sidebar"
      type="button"
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: ComponentPropsWithoutRef<"main">): ReactElement {
  return (
    <main className={classes("sidebar__inset", className)} data-slot="sidebar-inset" {...props} />
  );
}

function part(baseClass: string, dataSlot: string) {
  return function SidebarPart({
    className,
    ...props
  }: ComponentPropsWithoutRef<"div">): ReactElement {
    return <div className={classes(baseClass, className)} data-slot={dataSlot} {...props} />;
  };
}

function SidebarSeparator({ className, ...props }: SeparatorProps): ReactElement {
  return (
    <Separator
      className={classes("sidebar__separator", className)}
      data-slot="sidebar-separator"
      {...props}
    />
  );
}

type RenderableDivProps = useRender.ComponentProps<"div">;
type RenderableButtonProps = useRender.ComponentProps<"button">;
type RenderableAnchorProps = useRender.ComponentProps<"a">;

function SidebarGroupLabel({ className, render, ...props }: RenderableDivProps): ReactElement {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: classes("sidebar__group-label", className),
        "data-slot": "sidebar-group-label",
      } as RenderableDivProps,
      props,
    ),
    render,
  });
}

function SidebarGroupAction({ className, render, ...props }: RenderableButtonProps): ReactElement {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: classes("sidebar__group-action", className),
        "data-slot": "sidebar-group-action",
        type: "button",
      } as RenderableButtonProps,
      props,
    ),
    render,
  });
}

function SidebarMenu({ className, ...props }: ComponentPropsWithoutRef<"ul">): ReactElement {
  return <ul className={classes("sidebar__menu", className)} data-slot="sidebar-menu" {...props} />;
}

function SidebarMenuItem({ className, ...props }: ComponentPropsWithoutRef<"li">): ReactElement {
  return (
    <li
      className={classes("sidebar__menu-item", className)}
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps extends RenderableButtonProps {
  isActive?: boolean;
  /** Shown from the collapsed icon rail, where the label itself is hidden. */
  tooltip?: string | (Omit<TooltipContentProps, "children"> & { children: ReactNode });
}

/* One row height, deliberately: a navigation column that mixes row sizes reads as unfinished. */
function SidebarMenuButton({
  className,
  isActive = false,
  render,
  tooltip,
  ...props
}: SidebarMenuButtonProps): ReactElement {
  const { isMobile, state } = useSidebar();
  /* Trigger and root mount together or not at all: a trigger outside a root is a Base UI error. */
  const withTooltip = tooltip !== undefined && state === "collapsed" && !isMobile;

  const button = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: classes("sidebar__menu-button", className),
        "data-active": isActive || undefined,
        "data-slot": "sidebar-menu-button",
      } as RenderableButtonProps,
      props,
    ),
    render: withTooltip ? <Tooltip.Trigger render={render} /> : render,
  });

  if (!withTooltip) {
    return button;
  }

  const content = typeof tooltip === "string" ? { children: tooltip } : tooltip;
  return (
    <Tooltip>
      {button}
      <Tooltip.Content align="center" side="right" {...content} />
    </Tooltip>
  );
}

function SidebarMenuAction({ className, render, ...props }: RenderableButtonProps): ReactElement {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: classes("sidebar__menu-action", className),
        "data-slot": "sidebar-menu-action",
        type: "button",
      } as RenderableButtonProps,
      props,
    ),
    render,
  });
}

function SidebarMenuIcon({ className, ...props }: ComponentPropsWithoutRef<"span">): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={classes("sidebar__menu-icon", className)}
      data-slot="sidebar-menu-icon"
      {...props}
    />
  );
}

function SidebarMenuLabel({ className, ...props }: ComponentPropsWithoutRef<"span">): ReactElement {
  return (
    <span
      className={classes("sidebar__menu-label", className)}
      data-slot="sidebar-menu-label"
      {...props}
    />
  );
}

/*
 * The count is the real Chip, as the reference's is — the sidebar class only adds the row
 * behaviour: pushed to the end of the flex line, evened numerals, and no fill on the active
 * row. Custom CSS aimed at `.chip` restyles these counts along with every other chip.
 */
function SidebarMenuBadge({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "color">): ReactElement {
  return (
    <Chip
      className={classes("sidebar__menu-badge", className)}
      data-slot="sidebar-menu-badge"
      size="sm"
      {...props}
    />
  );
}

export interface SidebarMenuSkeletonProps extends ComponentPropsWithoutRef<"div"> {
  showIcon?: boolean;
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps): ReactElement {
  /* A stable random measure per row, so a loading list reads as text rather than bars. */
  const [width] = useState(() => `${Math.floor(Math.random() * 40) + 50}%`);

  return (
    <div
      className={classes("sidebar__menu-skeleton", className)}
      data-slot="sidebar-menu-skeleton"
      {...props}
    >
      {showIcon ? <Skeleton className="sidebar__menu-skeleton-icon" /> : null}
      <Skeleton
        className="sidebar__menu-skeleton-text"
        style={{ "--bc-sidebar-skeleton-width": width } as CSSProperties}
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: ComponentPropsWithoutRef<"ul">): ReactElement {
  return (
    <ul
      className={classes("sidebar__menu-sub", className)}
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
}

function SidebarMenuSubItem({ className, ...props }: ComponentPropsWithoutRef<"li">): ReactElement {
  return (
    <li
      className={classes("sidebar__menu-sub-item", className)}
      data-slot="sidebar-menu-sub-item"
      {...props}
    />
  );
}

export interface SidebarMenuSubButtonProps extends RenderableAnchorProps {
  isActive?: boolean;
}

function SidebarMenuSubButton({
  className,
  isActive = false,
  render,
  ...props
}: SidebarMenuSubButtonProps): ReactElement {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: classes("sidebar__menu-sub-button", className),
        "data-active": isActive || undefined,
        "data-slot": "sidebar-menu-sub-button",
      } as RenderableAnchorProps,
      props,
    ),
    render,
  });
}

export const Sidebar = Object.assign(SidebarRoot, {
  Content: part("sidebar__content", "sidebar-content"),
  Footer: part("sidebar__footer", "sidebar-footer"),
  Group: part("sidebar__group", "sidebar-group"),
  GroupAction: SidebarGroupAction,
  GroupContent: part("sidebar__group-content", "sidebar-group-content"),
  GroupLabel: SidebarGroupLabel,
  Header: part("sidebar__header", "sidebar-header"),
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuIcon: SidebarMenuIcon,
  MenuItem: SidebarMenuItem,
  MenuLabel: SidebarMenuLabel,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubButton: SidebarMenuSubButton,
  MenuSubItem: SidebarMenuSubItem,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
});
