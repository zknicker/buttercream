import { Segment, Separator, Spinner, ToggleButton } from "@buttercream/react";
import type { ReactElement } from "react";
import { useState } from "react";
import type { PreviewIconElements } from "./preview-icons.ts";

/* .specimen is already a wrapping flex row, so a row of specimens needs no wrapper. */

const SPINNER_SIZES = ["sm", "md", "lg", "xl"] as const;
const SPINNER_COLORS = ["current", "accent", "success", "warning", "danger"] as const;
const SEGMENT_SIZES = ["sm", "md", "lg"] as const;
const TOGGLE_SIZES = ["sm", "md", "lg"] as const;

export function SpinnerPreview(): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen">
        <Spinner />
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        {SPINNER_SIZES.map((size) => (
          <Spinner key={size} size={size} />
        ))}
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        {SPINNER_COLORS.map((color) => (
          <Spinner color={color} key={color} />
        ))}
        <div className="specimen__label">Colours</div>
      </section>
    </div>
  );
}

export function SeparatorPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  return (
    <div className="specimens">
      <section className="specimen specimen--stack">
        <div className="separator-demo">
          <Separator />
          <Separator variant="secondary" />
          <Separator variant="tertiary" />
        </div>
        <div className="specimen__label">Variants</div>
      </section>
      <section className="specimen specimen--stack">
        <div className="separator-demo">
          <Separator>or</Separator>
        </div>
        <div className="separator-demo">
          <Separator>{icons.mail} New messages</Separator>
        </div>
        <div className="specimen__label">With a label</div>
      </section>
      <section className="specimen">
        <div className="separator-row">
          <span>Draft</span>
          <Separator orientation="vertical" />
          <span>Published</span>
          <Separator orientation="vertical" />
          <span>Archived</span>
        </div>
        <div className="specimen__label">Vertical</div>
      </section>
    </div>
  );
}

export function SegmentPreview({ icons }: { icons: PreviewIconElements }): ReactElement {
  /* Controlled so the pill visibly follows a click rather than only rendering its initial state. */
  const [view, setView] = useState("grid");

  return (
    <div className="specimens">
      <section className="specimen">
        <Segment onValueChange={setView} value={view}>
          <Segment.Item value="grid">Grid</Segment.Item>
          <Segment.Item value="list">List</Segment.Item>
          <Segment.Item value="board">Board</Segment.Item>
        </Segment>
        <div className="specimen__label">Default</div>
      </section>
      <section className="specimen">
        <Segment defaultValue="mail">
          <Segment.Item value="mail">{icons.mail} Mail</Segment.Item>
          <Segment.Item value="users">{icons.users} People</Segment.Item>
          <Segment.Item value="settings">{icons.settings} Settings</Segment.Item>
        </Segment>
        <div className="specimen__label">With icons</div>
      </section>
      <section className="specimen">
        <div className="control-stack">
          {SEGMENT_SIZES.map((size) => (
            <Segment defaultValue="day" key={size} size={size}>
              <Segment.Item value="day">Day</Segment.Item>
              <Segment.Item value="week">Week</Segment.Item>
              <Segment.Item value="month">Month</Segment.Item>
            </Segment>
          ))}
        </div>
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <Segment defaultValue="all" variant="ghost">
          <Segment.Item value="all">All</Segment.Item>
          <Segment.Item value="unread">Unread</Segment.Item>
        </Segment>
        <div className="specimen__label">Ghost</div>
      </section>
      <section className="specimen">
        <Segment defaultValue="live">
          <Segment.Item value="live">Live</Segment.Item>
          <Segment.Item disabled value="paused">
            Paused
          </Segment.Item>
        </Segment>
        <div className="specimen__label">Disabled item</div>
      </section>
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
      <section className="specimen">
        <ToggleButton>Off</ToggleButton>
        <ToggleButton defaultPressed>On</ToggleButton>
        <div className="specimen__label">Default and pressed</div>
      </section>
      <section className="specimen">
        <ToggleButton variant="ghost">Ghost</ToggleButton>
        <ToggleButton defaultPressed variant="ghost">
          Ghost pressed
        </ToggleButton>
        <div className="specimen__label">Ghost</div>
      </section>
      <section className="specimen">
        {TOGGLE_SIZES.map((size) => (
          <ToggleButton defaultPressed key={size} size={size}>
            {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
          </ToggleButton>
        ))}
        <div className="specimen__label">Sizes</div>
      </section>
      <section className="specimen">
        <ToggleButton aria-label="Notifications" iconOnly>
          {icons.notification}
        </ToggleButton>
        <ToggleButton aria-label="Settings" defaultPressed iconOnly>
          {icons.settings}
        </ToggleButton>
        <ToggleButton aria-label="More options" iconOnly variant="ghost">
          {icons.more}
        </ToggleButton>
        <div className="specimen__label">Icon only</div>
      </section>
      <section className="specimen">
        <ToggleButton.Group defaultValue={["bold"]} multiple>
          <ToggleButton value="bold">Bold</ToggleButton>
          <ToggleButton value="italic">Italic</ToggleButton>
          <ToggleButton value="underline">Underline</ToggleButton>
        </ToggleButton.Group>
        <div className="specimen__label">Group</div>
      </section>
      <section className="specimen">
        <ControlledToggleDemo />
        <div className="specimen__label">Controlled</div>
      </section>
      <section className="specimen">
        <ToggleButton disabled>Unavailable</ToggleButton>
        <ToggleButton defaultPressed disabled>
          Locked on
        </ToggleButton>
        <div className="specimen__label">Disabled</div>
      </section>
    </div>
  );
}
