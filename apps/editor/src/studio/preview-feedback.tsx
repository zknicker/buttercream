import {
  Alert,
  Badge,
  Button,
  Chip,
  CloseButton,
  ProgressCircle,
  Skeleton,
} from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";

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
      <section className="specimen specimen--stack">
        <Alert
          action={
            <Button size="sm" variant="secondary">
              Undo
            </Button>
          }
          color="accent"
          title="Plan updated"
        >
          Your workspace now includes 3 more seats.
        </Alert>
        <div className="specimen__label">With action</div>
      </section>
      <section className="specimen specimen--stack">
        <Alert icon={<ProgressCircle color="accent" size="sm" value={null} />} title="Syncing">
          Uploading the latest changes.
        </Alert>
        <Alert icon={null} title="No icon">
          Pass icon=null to omit the leading glyph entirely.
        </Alert>
        <div className="specimen__label">Custom icon</div>
      </section>
      <section className="specimen specimen--stack">
        <DismissibleAlertSpecimen />
        <div className="specimen__label">Dismissible</div>
      </section>
    </div>
  );
}

/* action slot doubles as the dismiss affordance, CloseButton style; a ghost Button brings it back. */
function DismissibleAlertSpecimen(): ReactElement {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <Button onClick={() => setDismissed(false)} variant="ghost">
        Show alert
      </Button>
    );
  }

  return (
    <Alert
      action={<CloseButton label="Dismiss" onClick={() => setDismissed(true)} />}
      color="warning"
      title="Storage almost full"
    >
      You're using 92% of your workspace storage.
    </Alert>
  );
}

export function BadgePreview({ icons }: { icons: PreviewIconElements }): ReactElement {
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
        <Badge.Anchor badge={<Badge color="accent" placement="top-left" size="sm" />}>
          <Button variant="secondary">Alerts</Button>
        </Badge.Anchor>
        <Badge.Anchor badge={<Badge color="success" placement="bottom-right" size="sm" />}>
          <Button variant="secondary">Synced</Button>
        </Badge.Anchor>
        <Badge.Anchor badge={<Badge color="warning" placement="bottom-left" size="sm" />}>
          <Button variant="secondary">Pending</Button>
        </Badge.Anchor>
        <div className="specimen__label">Anchored</div>
      </section>
      <section className="specimen">
        <Badge color="accent">{icons.mail} New</Badge>
        <Badge color="success" variant="soft">
          Verified
        </Badge>
        <div className="specimen__label">With content</div>
      </section>
      <section className="specimen">
        <Badge aria-label="Online" color="success" size="sm" />
        <Badge aria-label="Away" color="warning" size="sm" />
        <Badge aria-label="Offline" color="danger" size="sm" />
        <div className="specimen__label">Dot</div>
      </section>
    </div>
  );
}

export function ChipPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
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
      <section className="specimen">
        <Chip color="accent">{icons.mail} Unread</Chip>
        <Chip color="success" variant="primary">
          {icons.add} Invited
        </Chip>
        <Chip color="danger" variant="tertiary">
          {icons.close} Removed
        </Chip>
        <div className="specimen__label">With icon</div>
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
      <section className="specimen specimen--stack">
        {[80, 60, 70].map((width) => (
          <Skeleton
            key={width}
            style={{ alignItems: "center", display: "flex", gap: "0.75rem", width: "100%" }}
          >
            <Skeleton style={{ borderRadius: "999px", height: "2rem", width: "2rem" }} />
            <Skeleton style={{ height: "0.75rem", width: `${width}%` }} />
          </Skeleton>
        ))}
        <div className="specimen__label">List items</div>
      </section>
      <section className="specimen">
        {[0, 1, 2, 3, 4, 5].map((cell) => (
          <Skeleton key={cell} style={{ height: "4rem", width: "4rem" }} />
        ))}
        <div className="specimen__label">Grid</div>
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
