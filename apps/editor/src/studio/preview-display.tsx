import { Segment, Separator, Spinner, ToggleButton } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";
import { Specimen } from "./preview-specimen.tsx";

/* .specimen is already a wrapping flex row, so a row of specimens needs no wrapper. */

const SPINNER_SIZES = ["sm", "md", "lg", "xl"] as const;
const SPINNER_COLORS = ["current", "accent", "success", "warning", "danger"] as const;
const SEGMENT_SIZES = ["sm", "md", "lg"] as const;
const TOGGLE_SIZES = ["sm", "md", "lg"] as const;

export function SpinnerPreview(): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default">
        <Spinner />
      </Specimen>
      <Specimen label="Sizes">
        {SPINNER_SIZES.map((size) => (
          <Spinner key={size} size={size} />
        ))}
      </Specimen>
      <Specimen label="Colours">
        {SPINNER_COLORS.map((color) => (
          <Spinner color={color} key={color} />
        ))}
      </Specimen>
    </div>
  );
}

export function SeparatorPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen className="specimen--stack" label="Variants">
        <div className="separator-demo">
          <Separator />
          <Separator variant="secondary" />
          <Separator variant="tertiary" />
        </div>
      </Specimen>
      <Specimen className="specimen--stack" label="With a label">
        <div className="separator-demo">
          <Separator>or</Separator>
        </div>
        <div className="separator-demo">
          <Separator>{icons.mail} New messages</Separator>
        </div>
      </Specimen>
      <Specimen label="Vertical">
        <div className="separator-row">
          <span>Draft</span>
          <Separator orientation="vertical" />
          <span>Published</span>
          <Separator orientation="vertical" />
          <span>Archived</span>
        </div>
      </Specimen>
    </div>
  );
}

export function SegmentPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  /* Controlled so the pill visibly follows a click rather than only rendering its initial state. */
  const [view, setView] = useState("grid");

  return (
    <div className="specimens">
      <Specimen label="Default">
        <Segment onValueChange={setView} value={view}>
          <Segment.Item value="grid">Grid</Segment.Item>
          <Segment.Item value="list">List</Segment.Item>
          <Segment.Item value="board">Board</Segment.Item>
        </Segment>
      </Specimen>
      <Specimen label="With icons">
        <Segment defaultValue="mail">
          <Segment.Item value="mail">{icons.mail} Mail</Segment.Item>
          <Segment.Item value="users">{icons.users} People</Segment.Item>
          <Segment.Item value="settings">{icons.settings} Settings</Segment.Item>
        </Segment>
      </Specimen>
      <Specimen label="Sizes">
        <div className="control-stack">
          {SEGMENT_SIZES.map((size) => (
            <Segment defaultValue="day" key={size} size={size}>
              <Segment.Item value="day">Day</Segment.Item>
              <Segment.Item value="week">Week</Segment.Item>
              <Segment.Item value="month">Month</Segment.Item>
            </Segment>
          ))}
        </div>
      </Specimen>
      <Specimen label="Ghost">
        <Segment defaultValue="all" variant="ghost">
          <Segment.Item value="all">All</Segment.Item>
          <Segment.Item value="unread">Unread</Segment.Item>
        </Segment>
      </Specimen>
      <Specimen label="Icon expand — only the selected view spends width on its label">
        <div className="flex w-64 justify-start">
          <Segment showLabels="selected" defaultValue="grid" size="sm" variant="ghost">
            <Segment.Item value="grid">
              {icons.grid}
              <span>Grid</span>
            </Segment.Item>
            <Segment.Item aria-label="List" value="list">
              {icons.list}
              <span>List</span>
            </Segment.Item>
            <Segment.Item aria-label="Calendar" value="calendar">
              {icons.calendar}
              <span>Calendar</span>
            </Segment.Item>
            <Segment.Item aria-label="Mail" value="mail">
              {icons.mail}
              <span>Mail</span>
            </Segment.Item>
          </Segment>
        </div>
      </Specimen>
      <Specimen label="Disabled item">
        <Segment defaultValue="live">
          <Segment.Item value="live">Live</Segment.Item>
          <Segment.Item disabled value="paused">
            Paused
          </Segment.Item>
        </Segment>
      </Specimen>
    </div>
  );
}

/* Controlled so the pressed pill visibly follows a click rather than only rendering its initial state. */
function ControlledToggleDemo(): ReactElement {
  const [pressed, setPressed] = useState(false);
  return (
    <ToggleButton onPressedChange={setPressed} pressed={pressed}>
      {pressed ? "Following" : "Follow"}
    </ToggleButton>
  );
}

export function ToggleButtonPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <Specimen label="Default and pressed">
        <ToggleButton>Off</ToggleButton>
        <ToggleButton defaultPressed>On</ToggleButton>
      </Specimen>
      <Specimen label="Ghost">
        <ToggleButton variant="ghost">Ghost</ToggleButton>
        <ToggleButton defaultPressed variant="ghost">
          Ghost pressed
        </ToggleButton>
      </Specimen>
      <Specimen label="Sizes">
        {TOGGLE_SIZES.map((size) => (
          <ToggleButton defaultPressed key={size} size={size}>
            {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
          </ToggleButton>
        ))}
      </Specimen>
      <Specimen label="Icon only">
        <ToggleButton aria-label="Notifications" iconOnly>
          {icons.notification}
        </ToggleButton>
        <ToggleButton aria-label="Settings" defaultPressed iconOnly>
          {icons.settings}
        </ToggleButton>
        <ToggleButton aria-label="More options" iconOnly variant="ghost">
          {icons.more}
        </ToggleButton>
      </Specimen>
      <Specimen label="Group">
        <ToggleButton.Group defaultValue={["bold"]} multiple>
          <ToggleButton value="bold">Bold</ToggleButton>
          <ToggleButton value="italic">Italic</ToggleButton>
          <ToggleButton value="underline">Underline</ToggleButton>
        </ToggleButton.Group>
      </Specimen>
      <Specimen label="Controlled">
        <ControlledToggleDemo />
      </Specimen>
      <Specimen label="Disabled">
        <ToggleButton disabled>Unavailable</ToggleButton>
        <ToggleButton defaultPressed disabled>
          Locked on
        </ToggleButton>
      </Specimen>
    </div>
  );
}
