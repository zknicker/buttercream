import { Alert, Badge, Button, Chip, ProgressCircle, Skeleton } from "@buttercream/react";
import type { ReactElement } from "react";

const ROLES = ["accent", "success", "warning", "danger"] as const;

export function AlertPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Alert title="Changes saved">Your updates are live for everyone on the team.</Alert>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen specimen--stack">
        {ROLES.map((role) => (
          <Alert color={role} key={role} title={`${role[0]?.toUpperCase()}${role.slice(1)}`}>
            A short explanation of what happened.
          </Alert>
        ))}
        <div className="specimen__label">Colours</div>
      </section>
      <section className="specimen specimen--stack">
        <Alert title="Title only" />
        <Alert>Description only, with no title above it.</Alert>
        <div className="specimen__label">Partial content</div>
      </section>
    </div>
  );
}

export function BadgePreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Badge>5</Badge>
        <Badge size="sm">2</Badge>
        <Badge size="lg">12</Badge>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <Badge color={role} key={role}>
            8
          </Badge>
        ))}
        <div className="specimen__label">Colours</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <Badge color={role} key={role} variant="soft">
            8
          </Badge>
        ))}
        <div className="specimen__label">Soft</div>
      </section>
      <section className="specimen">
        <Badge.Anchor badge={<Badge color="danger" placement="top-right" size="sm" />}>
          <Button variant="secondary">Inbox</Button>
        </Badge.Anchor>
        <Badge.Anchor badge={<Badge color="accent" placement="top-right" size="sm" />}>
          <Button variant="secondary">Alerts</Button>
        </Badge.Anchor>
        <div className="specimen__label">Anchored</div>
      </section>
    </div>
  );
}

export function ChipPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Chip size="sm">Small</Chip>
        <Chip>Medium</Chip>
        <Chip size="lg">Large</Chip>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <Chip color={role} key={role}>
            {role}
          </Chip>
        ))}
        <div className="specimen__label">Soft</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <Chip color={role} key={role} variant="primary">
            {role}
          </Chip>
        ))}
        <div className="specimen__label">Primary</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <Chip color={role} key={role} variant="tertiary">
            {role}
          </Chip>
        ))}
        <div className="specimen__label">Tertiary</div>
      </section>
    </div>
  );
}

export function SkeletonPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <Skeleton style={{ height: "0.75rem", width: "12rem" }} />
        <Skeleton style={{ height: "0.75rem", width: "16rem" }} />
        <Skeleton style={{ height: "0.75rem", width: "9rem" }} />
        <div className="specimen__label">Shimmer</div>
      </section>
      <section className="specimen specimen--stack">
        <Skeleton animation="pulse" style={{ height: "0.75rem", width: "12rem" }} />
        <Skeleton animation="pulse" style={{ height: "0.75rem", width: "16rem" }} />
        <div className="specimen__label">Pulse</div>
      </section>
      <section className="specimen">
        <Skeleton animation="none" style={{ height: "3rem", width: "3rem" }} />
        <div className="specimen__label">Still</div>
      </section>
      <section className="specimen">
        {/* The outer skeleton sweeps for the whole group rather than each child running its own. */}
        <Skeleton style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", width: "100%" }}>
          <Skeleton style={{ borderRadius: "999px", height: "2.5rem", width: "2.5rem" }} />
          <Skeleton style={{ flex: 1, height: "2.5rem" }} />
        </Skeleton>
        <div className="specimen__label">Nested</div>
      </section>
    </div>
  );
}

export function ProgressCirclePreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <ProgressCircle size="sm" value={35} />
        <ProgressCircle value={65} />
        <ProgressCircle size="lg" value={80} />
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        {ROLES.map((role) => (
          <ProgressCircle color={role} key={role} value={70} />
        ))}
        <div className="specimen__label">Colours</div>
      </section>
      <section className="specimen">
        <ProgressCircle value={0} />
        <ProgressCircle value={50} />
        <ProgressCircle value={100} />
        <div className="specimen__label">Empty, half, full</div>
      </section>
      <section className="specimen">
        <ProgressCircle color="accent" value={null} />
        <div className="specimen__label">Indeterminate</div>
      </section>
    </div>
  );
}
