import { Avatar, Card, Typography } from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement, ReactNode } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";

/*
 * The chrome the application previews share. These pages exist to show the system doing a real
 * job rather than one control at a time, so the shell is deliberately plain: it is a frame for
 * the components, and every colour and corner in it comes from the theme.
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
}: {
  children: ReactNode;
  sidebar: ReactNode;
}): ReactElement {
  return (
    <div className="app">
      <aside className="app__sidebar">{sidebar}</aside>
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
    <nav className="app__nav">
      {items.map((item) => (
        <span className="app__nav-item" data-current={item.current || undefined} key={item.label}>
          {icon[item.icon]}
          <span className="app__nav-label">{item.label}</span>
          {item.badge === undefined ? null : <span className="app__nav-badge">{item.badge}</span>}
        </span>
      ))}
    </nav>
  );
}

export function AppHeader({
  actions,
  subtitle,
  title,
}: {
  actions?: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
}): ReactElement {
  return (
    <header className="app__header">
      <div className="app__header-text">
        <Typography variant="h5">{title}</Typography>
        {subtitle === undefined ? null : (
          <Typography className="app__subtitle" variant="body-sm">
            {subtitle}
          </Typography>
        )}
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
