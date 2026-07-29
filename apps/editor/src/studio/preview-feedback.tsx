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
import { Specimen } from "./preview-specimen.tsx";

const ROLES = ["accent", "success", "warning", "danger"] as const;

export function AlertPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Default">
        <Alert title="Changes saved">Your updates are live for everyone on the team.</Alert>
      </Specimen>
      <Specimen className="specimen--stack" label="Colours">
        {ROLES.map((role) => (
          <Alert color={role} key={role} title={`${role[0]?.toUpperCase()}${role.slice(1)}`}>
            A short explanation of what happened.
          </Alert>
        ))}
      </Specimen>
      <Specimen className="specimen--stack" label="Partial content">
        <Alert title="Title only" />
        <Alert>Description only, with no title above it.</Alert>
      </Specimen>
      <Specimen className="specimen--stack" label="With action">
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
      </Specimen>
      <Specimen className="specimen--stack" label="Custom icon">
        <Alert icon={<ProgressCircle color="accent" size="sm" value={null} />} title="Syncing">
          Uploading the latest changes.
        </Alert>
        <Alert icon={null} title="No icon">
          Pass icon=null to omit the leading glyph entirely.
        </Alert>
      </Specimen>
      <Specimen className="specimen--stack" label="Dismissible">
        <DismissibleAlertSpecimen />
      </Specimen>
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
      <Specimen label="Sizes">
        <Badge>5</Badge>
        <Badge size="sm">2</Badge>
        <Badge size="lg">12</Badge>
      </Specimen>
      <Specimen label="Colours">
        {ROLES.map((role) => (
          <Badge color={role} key={role}>
            8
          </Badge>
        ))}
      </Specimen>
      <Specimen label="Soft">
        {ROLES.map((role) => (
          <Badge color={role} key={role} variant="soft">
            8
          </Badge>
        ))}
      </Specimen>
      <Specimen label="Anchored">
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
      </Specimen>
      <Specimen label="With content">
        <Badge color="accent">{icons.mail} New</Badge>
        <Badge color="success" variant="soft">
          Verified
        </Badge>
      </Specimen>
      <Specimen label="Dot">
        <Badge aria-label="Online" color="success" size="sm" />
        <Badge aria-label="Away" color="warning" size="sm" />
        <Badge aria-label="Offline" color="danger" size="sm" />
      </Specimen>
    </div>
  );
}

export function ChipPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Sizes">
        <Chip size="sm">Small</Chip>
        <Chip>Medium</Chip>
        <Chip size="lg">Large</Chip>
      </Specimen>
      <Specimen label="Soft">
        {ROLES.map((role) => (
          <Chip color={role} key={role}>
            {role}
          </Chip>
        ))}
      </Specimen>
      <Specimen label="Primary">
        {ROLES.map((role) => (
          <Chip color={role} key={role} variant="primary">
            {role}
          </Chip>
        ))}
      </Specimen>
      <Specimen label="Tertiary">
        {ROLES.map((role) => (
          <Chip color={role} key={role} variant="tertiary">
            {role}
          </Chip>
        ))}
      </Specimen>
      <Specimen label="With icon">
        <Chip color="accent">{icons.mail} Unread</Chip>
        <Chip color="success" variant="primary">
          {icons.add} Invited
        </Chip>
        <Chip color="danger" variant="tertiary">
          {icons.close} Removed
        </Chip>
      </Specimen>
    </div>
  );
}

export function SkeletonPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Shimmer">
        <Skeleton style={{ height: "0.75rem", width: "12rem" }} />
        <Skeleton style={{ height: "0.75rem", width: "16rem" }} />
        <Skeleton style={{ height: "0.75rem", width: "9rem" }} />
      </Specimen>
      <Specimen className="specimen--stack" label="Pulse">
        <Skeleton animation="pulse" style={{ height: "0.75rem", width: "12rem" }} />
        <Skeleton animation="pulse" style={{ height: "0.75rem", width: "16rem" }} />
      </Specimen>
      <Specimen label="Still">
        <Skeleton animation="none" style={{ height: "3rem", width: "3rem" }} />
      </Specimen>
      <Specimen label="Nested">
        {/* The outer skeleton sweeps for the whole group rather than each child running its own. */}
        <Skeleton style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", width: "100%" }}>
          <Skeleton style={{ borderRadius: "999px", height: "2.5rem", width: "2.5rem" }} />
          <Skeleton style={{ flex: 1, height: "2.5rem" }} />
        </Skeleton>
      </Specimen>
      <Specimen className="specimen--stack" label="List items">
        {[80, 60, 70].map((width) => (
          <Skeleton
            key={width}
            style={{ alignItems: "center", display: "flex", gap: "0.75rem", width: "100%" }}
          >
            <Skeleton style={{ borderRadius: "999px", height: "2rem", width: "2rem" }} />
            <Skeleton style={{ height: "0.75rem", width: `${width}%` }} />
          </Skeleton>
        ))}
      </Specimen>
      <Specimen label="Grid">
        {[0, 1, 2, 3, 4, 5].map((cell) => (
          <Skeleton key={cell} style={{ height: "4rem", width: "4rem" }} />
        ))}
      </Specimen>
    </div>
  );
}

export function ProgressCirclePreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Sizes">
        <ProgressCircle size="sm" value={35} />
        <ProgressCircle value={65} />
        <ProgressCircle size="lg" value={80} />
      </Specimen>
      <Specimen label="Colours">
        {ROLES.map((role) => (
          <ProgressCircle color={role} key={role} value={70} />
        ))}
      </Specimen>
      <Specimen label="Empty, half, full">
        <ProgressCircle value={0} />
        <ProgressCircle value={50} />
        <ProgressCircle value={100} />
      </Specimen>
      <Specimen label="Indeterminate">
        <ProgressCircle color="accent" value={null} />
      </Specimen>
    </div>
  );
}
