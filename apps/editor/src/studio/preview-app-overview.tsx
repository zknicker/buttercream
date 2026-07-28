import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  CloseButton,
  Field,
  Input,
  InputOTP,
  Kbd,
  RadioGroup,
  Segment,
  Select,
  Slider,
  Switch,
  Tabs,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { ReactElement } from "react";
import { createPreviewIconElements } from "./preview-icons.ts";
import { usePreviewSurface } from "./preview-surface.tsx";

/*
 * The overview page: many components at once rather than one at a time, so the system can be
 * judged as a whole — whether the corners agree, whether the greys sit at the same distance from
 * the page, whether one control shouts louder than its neighbours.
 *
 * Three fixed columns rather than a masonry, matching the reference. Most items sit bare on the
 * page so their own edges are what you see; only the handful that are genuinely cards carry a
 * surface, which is a distinction this page exists to make.
 */

const STATES = ["Florida", "Delaware", "California", "Texas", "New York", "Washington"];

const COMMUNITIES = [
  {
    author: "John",
    blurb: "148 members sharing launches, revenue experiments, and honest build logs.",
    name: "Indie Hackers",
  },
  {
    author: "Martha",
    blurb: "362 members prototyping agents, models, and workflows together every week.",
    name: "AI Builders",
  },
];

export function OverviewAppPreview({ icons }: { icons: DesignSystem["icons"] }): ReactElement {
  const icon = createPreviewIconElements(icons);
  const surface = usePreviewSurface();

  return (
    <div className="overview">
      <div className="overview__column overview__column--narrow">
        <Field name="overview-email">
          <Field.Label>Your email</Field.Label>
          <Input placeholder="john@email.com" required type="email" />
          <Field.Description>We won&rsquo;t share your email</Field.Description>
        </Field>

        <Select container={surface} label="State" placeholder="Select one">
          {STATES.map((state) => (
            <Select.Item key={state} value={state}>
              {state}
            </Select.Item>
          ))}
        </Select>

        {/* The selection controls together, which is the only way to see them agree. */}
        <div className="overview__controls">
          <RadioGroup aria-label="Unselected radio" defaultValue="other">
            <RadioGroup.Item value="this" />
          </RadioGroup>
          <Checkbox defaultChecked />
          <Switch defaultChecked />
          <RadioGroup aria-label="Second unselected radio" defaultValue="other">
            <RadioGroup.Item value="this" />
          </RadioGroup>
          <RadioGroup aria-label="Selected radio" defaultValue="this">
            <RadioGroup.Item value="this" />
          </RadioGroup>
        </div>

        <Slider
          aria-label="Price"
          defaultValue={250}
          format={{ currency: "USD", style: "currency" }}
          label="Price"
          max={500}
        />

        <Segment aria-label="Range" defaultValue="1d">
          <Segment.Item value="1d">1D</Segment.Item>
          <Segment.Item value="7d">7D</Segment.Item>
          <Segment.Item value="1m">1M</Segment.Item>
          <Segment.Item value="1y">1Y</Segment.Item>
          <Segment.Item value="all">All</Segment.Item>
        </Segment>

        <Tabs defaultValue="chats">
          <Tabs.List>
            <Tabs.Tab value="chats">Chats</Tabs.Tab>
            <Tabs.Tab value="emails">Emails</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Card className="overview__menu">
          <span className="overview__menu-label">Actions</span>
          <span className="overview__menu-item">
            {icon.add}
            <span className="overview__menu-text">
              <span className="overview__menu-title">New file</span>
              <span className="overview__menu-hint">Create a new file</span>
            </span>
            <Kbd>⌘N</Kbd>
          </span>
          <span className="overview__menu-item">
            {icon.settings}
            <span className="overview__menu-text">
              <span className="overview__menu-title">Edit file</span>
              <span className="overview__menu-hint">Make changes</span>
            </span>
            <Kbd>⌘E</Kbd>
          </span>
          <span className="overview__menu-label">Danger zone</span>
          <span className="overview__menu-item" data-danger>
            {icon.delete}
            <span className="overview__menu-text">
              <span className="overview__menu-title">Delete file</span>
              <span className="overview__menu-hint">Move to trash</span>
            </span>
            <Kbd>⌘⇧D</Kbd>
          </span>
        </Card>
      </div>

      <div className="overview__column overview__column--wide">
        <div className="overview__avatars">
          {["AM", "BK", "CR", "DL", "EN"].map((who) => (
            <Avatar key={who} shape="circle">
              <Avatar.Fallback>{who}</Avatar.Fallback>
            </Avatar>
          ))}
          <span className="overview__avatars-more">+5</span>
        </div>

        <div className="overview__verify">
          <span className="overview__verify-title">Verify account</span>
          <span className="overview__verify-hint">We&rsquo;ve sent a code to a****@gmail.com</span>
          <InputOTP defaultValue="4320" groupSize={3} length={6} />
          <span className="overview__verify-hint">
            Didn&rsquo;t receive a code?{" "}
            <button className="overview__link" type="button">
              Resend
            </button>
          </span>
        </div>

        <div className="overview__buttons">
          <Button>Click me</Button>
          <Button variant="tertiary">Click me</Button>
          <Button variant="outline">Click me</Button>
          <Button variant="danger">Click me</Button>
          <Button variant="danger-soft">Click me</Button>
          <Button variant="ghost">Click me</Button>
        </div>

        <Card className="overview__profile">
          <Avatar size="lg">
            <Avatar.Fallback>BC</Avatar.Fallback>
          </Avatar>
          <span className="overview__profile-name">Buttercream</span>
          <span className="overview__profile-handle">@buttercream</span>
          <p className="overview__profile-bio">
            A design system you can drive from one config, for web and native.
          </p>
          <span className="overview__profile-stats">
            <strong>4</strong> Following <strong>97.1K</strong> Followers
          </span>
        </Card>

        <Alert
          action={
            <Button size="sm" variant="secondary">
              Upgrade
            </Button>
          }
          title="You have 2 credits left"
        >
          Get a paid plan for more credits
        </Alert>

        <div className="overview__switch-row">
          <span className="overview__switch-text">
            <span className="overview__switch-title">Allow notifications</span>
            <span className="overview__switch-hint">
              Receive push notifications from Buttercream
            </span>
          </span>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="overview__column overview__column--wide">
        <Card className="overview__dialog">
          <CloseButton aria-label="Dismiss" className="overview__dismiss" />
          <span aria-hidden className="overview__dialog-icon">
            {icon.users}
          </span>
          <span className="overview__dialog-title">Create an account</span>
          <p className="overview__dialog-body">
            Start your free 7-day trial. No credit card required.
          </p>
          <Button fullWidth>Get started</Button>
          <span className="overview__or">OR</span>
          {/*
           * The reference offers Google and Apple here. Those are brand marks rather than part of
           * the icon vocabulary, and drawing them by hand is the thing this system avoids — so
           * these say what they do instead.
           */}
          <Button fullWidth variant="secondary">
            Continue with email
          </Button>
          <Button fullWidth variant="secondary">
            Continue with single sign-on
          </Button>
        </Card>

        <div className="overview__communities">
          {COMMUNITIES.map((community) => (
            <Card className="overview__community" key={community.name}>
              <span aria-hidden className="overview__community-art" />
              <span className="overview__community-name">{community.name}</span>
              <p className="overview__community-blurb">{community.blurb}</p>
              <span className="overview__community-author">
                <Avatar size="sm">
                  <Avatar.Fallback>{community.author[0]}</Avatar.Fallback>
                </Avatar>
                By {community.author}
              </span>
            </Card>
          ))}
        </div>

        <Card className="overview__dialog">
          <CloseButton aria-label="Dismiss" className="overview__dismiss" />
          <span aria-hidden className="overview__dialog-icon">
            {icon.upload}
          </span>
          <span className="overview__dialog-title">Unsaved changes</span>
          <p className="overview__dialog-body">Do you want to save or discard changes?</p>
          <span className="overview__dialog-actions">
            <Button variant="secondary">Discard</Button>
            <Button>Save changes</Button>
          </span>
        </Card>
      </div>
    </div>
  );
}
