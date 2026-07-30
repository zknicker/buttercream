import { Avatar, Card, Sidebar, Typography } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement, ReactNode } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";

/*
 * The chrome the application previews share. These pages exist to show the system doing a real
 * job rather than one control at a time, so the shell is a frame of real components: the
 * sidebar is the library's Sidebar in its static form — interactive menu buttons, no collapse
 * machinery — because a preview inside a frame has no viewport to fix a collapsing panel to.
 */

export interface AppNavItem {
  badge?: string;
  current?: boolean;
  icon: keyof ReturnType<typeof createPreviewIconElements>;
  label: string;
}

export function AppFrame({
  children,
  sidebar,
  sidebarOpen = true,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  sidebarOpen?: boolean;
}): ReactElement {
  return (
    <div className="app" data-sidebar-open={sidebarOpen}>
      <Sidebar.Provider className="app__sidebar-provider" hidden={!sidebarOpen}>
        <Sidebar className="app__sidebar" collapsible="none">
          <Sidebar.Content>{sidebar}</Sidebar.Content>
        </Sidebar>
      </Sidebar.Provider>
      <div className="app__main">{children}</div>
    </div>
  );
}

export function AppIdentity({ email, name }: { email: string; name: string }): ReactElement {
  return (
    <div className="app__identity">
      <Avatar shape="circle" size="sm">
        <Avatar.Fallback>
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </Avatar.Fallback>
      </Avatar>
      <span className="app__identity-text">
        <span className="app__identity-name">{name}</span>
        <span className="app__identity-email">{email}</span>
      </span>
    </div>
  );
}

export function AppNav({
  icons,
  items,
}: {
  icons: DesignSystem["icons"];
  items: AppNavItem[];
}): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <Sidebar.Group>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {items.map((item) => (
            <Sidebar.MenuItem key={item.label}>
              <Sidebar.MenuButton isActive={item.current ?? false}>
                <Sidebar.MenuIcon>{icon[item.icon]}</Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                {item.badge === undefined ? null : (
                  <Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
                )}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  );
}

export function AppHeader({
  actions,
  leading,
  subtitle,
  title,
}: {
  actions?: ReactNode;
  leading?: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
}): ReactElement {
  return (
    <header className="app__header">
      <div className="app__header-leading">
        {leading}
        <div className="app__header-text">
          <Typography as="h1" variant="h6">
            {title}
          </Typography>
          {subtitle === undefined ? null : (
            <Typography className="app__subtitle" variant="body-sm">
              {subtitle}
            </Typography>
          )}
        </div>
      </div>
      {actions === undefined ? null : <div className="app__header-actions">{actions}</div>}
    </header>
  );
}

export interface AppStat {
  delta?: string;
  label: string;
  tone?: "up" | "down";
  value: string;
}

export function AppStats({ stats }: { stats: AppStat[] }): ReactElement {
  return (
    <div className="app__stats">
      {stats.map((stat) => (
        <article className="stat" key={stat.label}>
          <span className="stat__label">{stat.label}</span>
          <span className="stat__value">{stat.value}</span>
          {stat.delta === undefined ? null : (
            <span className="stat__delta" data-tone={stat.tone ?? "up"}>
              {stat.tone === "down" ? "↓" : "↑"} {stat.delta}
            </span>
          )}
        </article>
      ))}
    </div>
  );
}

export function AppPanel({
  actions,
  children,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
}): ReactElement {
  return (
    <Card className="panel">
      {title === undefined ? null : (
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          {actions === undefined ? null : <Card.Action>{actions}</Card.Action>}
        </Card.Header>
      )}
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}
