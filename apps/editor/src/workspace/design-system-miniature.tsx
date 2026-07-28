import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Field,
  Input,
  Switch,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { createPreviewIconElements } from "../studio/preview-icons.ts";

/*
 * The specimen a design-system card renders live, at card size.
 *
 * Purpose-built rather than a scaled-down `preview-app-overview`: that page mounts overlays
 * (which portal, and would escape the card), forty-odd interactive components, and needs a
 * full editor pane to lay out. This is a still life — roughly fifteen mounts, no overlays,
 * no charts, no animation — chosen so that every decision a user actually makes in the
 * editor is visible at a glance: accent, neutrals, radius, shadow, both fonts, density, and
 * the icon family.
 *
 * Nothing here is interactive. The card marks the whole subtree `inert`, so controls are
 * rendered in a representative state (checked, filled) rather than wired to handlers.
 */

const NAV_ITEMS = [
  { icon: "mail", label: "Inbox" },
  { icon: "users", label: "Customers" },
  { icon: "settings", label: "Settings" },
] as const;

const ACTIVITY = [
  {
    color: "success",
    initials: "AR",
    meta: "Invited 2 days ago",
    name: "Ada Reyes",
    status: "Active",
  },
  { color: "warning", initials: "JL", meta: "Invited today", name: "Jonah Lin", status: "Pending" },
] as const;

export function DesignSystemMiniature({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);

  return (
    <div className="miniature">
      <aside className="miniature__sidebar">
        <div className="miniature__identity">
          <Avatar shape="circle" size="sm">
            <Avatar.Fallback>BC</Avatar.Fallback>
          </Avatar>
          <span className="miniature__identity-name">Buttercream</span>
        </div>
        <nav className="miniature__nav">
          {NAV_ITEMS.map((item, index) => (
            <span
              className="miniature__nav-item"
              data-current={index === 0 || undefined}
              key={item.label}
            >
              {icon[item.icon]}
              <span>{item.label}</span>
            </span>
          ))}
        </nav>
      </aside>

      <div className="miniature__main">
        <header className="miniature__header">
          <div>
            <h1 className="miniature__title">Overview</h1>
            <p className="miniature__subtitle">Everything at a glance</p>
          </div>
          <div className="miniature__actions">
            <Button size="sm" variant="outline">
              Export
            </Button>
            <Button size="sm">{icon.add}New</Button>
          </div>
        </header>

        <div className="miniature__stats">
          <Card className="miniature__stat">
            <span className="miniature__stat-label">Revenue</span>
            <span className="miniature__stat-value">$48,120</span>
            <Badge color="success" variant="soft">
              +12%
            </Badge>
          </Card>
          <Card className="miniature__stat">
            <span className="miniature__stat-label">Active</span>
            <span className="miniature__stat-value">2,318</span>
            <Badge color="accent" variant="soft">
              +4%
            </Badge>
          </Card>
        </div>

        <Card className="miniature__panel">
          <Field fullWidth>
            <Field.Label>Workspace name</Field.Label>
            <Input defaultValue="Northwood" readOnly />
          </Field>
          <div className="miniature__controls">
            <Checkbox defaultChecked>Weekly digest</Checkbox>
            <Switch defaultChecked />
          </div>
          <div className="miniature__chips">
            <Chip color="accent" size="sm">
              Design
            </Chip>
            <Chip size="sm" variant="soft">
              Draft
            </Chip>
          </div>
        </Card>

        {/* Fills the rest of the frame, so the vignette reads as a page rather than a fragment. */}
        <Card className="miniature__list">
          {ACTIVITY.map((row) => (
            <div className="miniature__row" key={row.name}>
              <Avatar shape="circle" size="sm">
                <Avatar.Fallback>{row.initials}</Avatar.Fallback>
              </Avatar>
              <span className="miniature__row-text">
                <span className="miniature__row-name">{row.name}</span>
                <span className="miniature__row-meta">{row.meta}</span>
              </span>
              <Badge color={row.color} variant="soft">
                {row.status}
              </Badge>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
