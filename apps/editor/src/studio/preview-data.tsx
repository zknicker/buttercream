import { Avatar, Button, Chip, Table, Typography } from "@buttercream/react";
import type { ReactElement } from "react";

/* The reference's own sample rows, so the two pages can be compared side by side. */
const TEAM = [
  { email: "kate@acme.com", name: "Kate Moore", role: "CEO", status: "Active" },
  { email: "john@acme.com", name: "John Smith", role: "CTO", status: "Active" },
  { email: "sara@acme.com", name: "Sara Johnson", role: "CMO", status: "On Leave" },
  { email: "michael@acme.com", name: "Michael Brown", role: "CFO", status: "Active" },
] as const;

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function TeamTable({ variant }: { variant?: "primary" | "secondary" }): ReactElement {
  return (
    <Table label="Team" {...(variant ? { variant } : {})}>
      <Table.Header>
        <Table.Row>
          <Table.Column>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Email</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {TEAM.map((member) => (
          <Table.Row key={member.email}>
            <Table.Cell>{member.name}</Table.Cell>
            <Table.Cell>{member.role}</Table.Cell>
            <Table.Cell>{member.status}</Table.Cell>
            <Table.Cell>{member.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

/* Table.Cell only ever renders children, so avatars, chips, and buttons drop in with no new props. */
function CustomCellsTable(): ReactElement {
  return (
    <Table label="Members">
      <Table.Header>
        <Table.Row>
          <Table.Column>Member</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {TEAM.map((member) => (
          <Table.Row key={member.email}>
            <Table.Cell>
              <span className="cell-person">
                <Avatar size="sm">
                  <Avatar.Fallback>{initials(member.name)}</Avatar.Fallback>
                </Avatar>
                <span className="cell-person__text">
                  <span className="cell-person__name">{member.name}</span>
                  <span className="cell-person__email">{member.email}</span>
                </span>
              </span>
            </Table.Cell>
            <Table.Cell>
              <Chip color={member.status === "Active" ? "success" : "warning"}>
                {member.status}
              </Chip>
            </Table.Cell>
            <Table.Cell>
              <Button size="sm" variant="ghost">
                Manage
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

/* No renderEmptyState prop exists or needs to — an empty body is just conditional JSX. */
function EmptyTeamTable(): ReactElement {
  return (
    <Table label="Team">
      <Table.Header>
        <Table.Row>
          <Table.Column>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={3} style={{ color: "var(--muted)", textAlign: "center" }}>
            No members yet.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export function TablePreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <TeamTable />
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        <TeamTable variant="secondary" />
        <div className="specimen__label">Secondary variant</div>
      </section>
      <section className="specimen specimen--stack">
        <CustomCellsTable />
        <div className="specimen__label">Custom cells</div>
      </section>
      <section className="specimen specimen--stack">
        <EmptyTeamTable />
        <div className="specimen__label">Empty state</div>
      </section>
    </div>
  );
}

const SCALE = [
  { note: "36px / 600 / tight", sample: "Build better interfaces", variant: "h1" },
  { note: "30px / 600 / tight", sample: "Built for the intelligence age", variant: "h2" },
  { note: "24px / 600 / tight", sample: "Pricing on your terms", variant: "h3" },
  { note: "20px / 600 / tight", sample: "Apply to the startup program", variant: "h4" },
  { note: "18px / 600 / tight", sample: "Card titles", variant: "h5" },
  { note: "16px / 600 / tight", sample: "Smaller feature headers", variant: "h6" },
  {
    note: "16px / 400 / 1.75",
    sample: "Primary body text used across documentation and product surfaces.",
    variant: "body",
  },
  {
    note: "14px / 400 / 1.50",
    sample: "Secondary body, table cells, navigation, and sidebar items.",
    variant: "body-sm",
  },
  {
    note: "12px / 400 / 1.25",
    sample: "Captions, helper text, and fine print.",
    variant: "body-xs",
  },
  { note: "14px / mono", sample: "npm i @buttercream/react", variant: "code" },
] as const;

export function TypographyPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <div className="type-scale">
          {SCALE.map((row) => (
            <div className="type-scale__row" key={row.variant}>
              <div className="type-scale__meta">
                <Typography as="span" variant="body-sm">
                  {row.variant}
                </Typography>
                <Typography as="span" className="type-scale__note" variant="body-xs">
                  {row.note}
                </Typography>
              </div>
              {/*
               * Rendered as a span so ten heading levels in a row do not invent a document
               * outline for what is only a specimen sheet.
               */}
              <Typography as="span" variant={row.variant}>
                {row.sample}
              </Typography>
            </div>
          ))}
        </div>
        <div className="specimen__label">Scale</div>
      </section>
      <section className="specimen specimen--stack">
        {/* as retargets the element while variant keeps the style, so document order and visual weight can disagree on purpose. */}
        <Typography as="h3" variant="h1">
          Styled like an h1, kept at heading level 3
        </Typography>
        <Typography as="label" variant="body-sm">
          Styled like body copy, kept as a label
        </Typography>
        <div className="specimen__label">Custom element</div>
      </section>
    </div>
  );
}
