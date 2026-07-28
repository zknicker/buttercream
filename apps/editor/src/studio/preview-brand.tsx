import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Input,
  RadioGroup,
  Slider,
  Switch,
  Tabs,
} from "@buttercream/react";
import type { DesignSystem } from "@buttercream/theme-core";
import type { CSSProperties, ReactElement } from "react";
import { useResolvedTokens } from "./preview-tokens.ts";

/*
 * The themed half of the Brand page: what the system currently looks like, at a glance.
 *
 * Everything here renders inside a PreviewSurface, so it is the artifact rather than the chrome —
 * real @buttercream/react components and resolved theme tokens, never a drawing of them. The
 * fields that author the document sit outside this island; see brand-page.tsx.
 */

const ROLES = ["accent", "default", "success", "warning", "danger"] as const;
const SURFACES = ["background", "surface", "overlay"] as const;

const TYPE_ROLES = [
  { role: "Heading", sample: "Aa", token: "--font-heading" },
  { role: "Body", sample: "Aa", token: "--font-sans" },
  { role: "Mono", sample: "0O1lI", token: "--font-mono" },
] as const;

const TOKEN_NAMES = [
  ...ROLES.map((role) => `--${role}`),
  ...SURFACES.map((surface) => `--${surface}`),
  ...TYPE_ROLES.map((type) => type.token),
];

export function BrandPreview({
  components,
}: {
  components: DesignSystem["components"];
}): ReactElement {
  const { ref, value } = useResolvedTokens(TOKEN_NAMES);

  return (
    <div className="brand" ref={ref}>
      <section className="brand__group">
        <h2 className="brand__title">Colour</h2>
        <div className="brand__chips">
          {[...ROLES, ...SURFACES].map((token) => (
            <article
              className="brand-chip"
              key={token}
              style={{ "--bc-chip": `var(--${token})` } as CSSProperties}
            >
              <span aria-hidden className="brand-chip__fill" />
              <span className="brand-chip__name">{token}</span>
              <code className="brand-chip__value">{value(`--${token}`)}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="brand__group">
        <h2 className="brand__title">Typography</h2>
        <div className="brand__type">
          {TYPE_ROLES.map((type) => (
            <article className="brand-type" key={type.role}>
              <span className="brand-type__specimen" style={{ fontFamily: `var(${type.token})` }}>
                {type.sample}
              </span>
              <span className="brand-type__role">{type.role}</span>
              {/* The stack as resolved, not as authored: an imported theme can carry any list. */}
              <code className="brand-type__family">{value(type.token)}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="brand__group">
        <h2 className="brand__title">Components</h2>
        {/*
         * Every control here is rendered with the project's own component defaults, so this strip
         * is where those settings become visible. `@buttercream/react` takes them as props rather
         * than reading the document, which is why they are passed explicitly.
         */}
        <div className="brand__strip">
          <div className="brand__strip-column">
            <div className="brand__strip-row">
              <Button
                size={components.button.defaultSize}
                variant={components.button.defaultVariant}
              >
                Get started
              </Button>
              <Avatar
                aria-label="Ada King"
                shape={components.avatar.defaultShape}
                size={components.avatar.defaultSize}
              >
                <Avatar.Fallback>AK</Avatar.Fallback>
              </Avatar>
            </div>
            <Input
              aria-label="Email"
              fullWidth={components.input.defaultFullWidth}
              placeholder="jane@example.com"
              variant={components.input.defaultVariant}
            />
            <Slider
              defaultValue={40}
              label="Volume"
              name="brand-volume"
              size={components.slider.defaultSize}
            />
          </div>

          <div className="brand__strip-column">
            <Switch defaultChecked name="brand-switch" size={components.switch.defaultSize}>
              Notifications
            </Switch>
            <Checkbox
              defaultChecked
              name="brand-checkbox"
              rounded={components.checkbox.defaultRounded}
              size={components.checkbox.defaultSize}
              variant={components.checkbox.defaultVariant}
            >
              Weekly digest
            </Checkbox>
            <RadioGroup
              defaultValue="pro"
              label="Plan"
              name="brand-plan"
              orientation={components.radioGroup.defaultOrientation}
              size={components.radioGroup.defaultSize}
              variant={components.radioGroup.defaultVariant}
            >
              <RadioGroup.Item value="starter">Starter</RadioGroup.Item>
              <RadioGroup.Item value="pro">Pro</RadioGroup.Item>
            </RadioGroup>
          </div>

          <div className="brand__strip-column">
            <Tabs
              defaultValue="Activity"
              orientation={components.tabs.defaultOrientation}
              variant={components.tabs.defaultVariant}
            >
              <Tabs.List>
                <Tabs.Tab value="Activity">Activity</Tabs.Tab>
                <Tabs.Tab value="Members">Members</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="Activity">Six deploys this week.</Tabs.Panel>
              <Tabs.Panel value="Members">Four people have access.</Tabs.Panel>
            </Tabs>
            <Card variant={components.card.defaultVariant}>
              <Card.Header>
                <Card.Title>Indie Hackers</Card.Title>
                <Card.Description>148 members sharing honest build logs.</Card.Description>
              </Card.Header>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
