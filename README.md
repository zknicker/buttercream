# Buttercream

Themeable React components and a hosted visual design-system editor.

```bash
bun add @buttercream/react @buttercream/styles
```

```css
@import "tailwindcss";
@import "@buttercream/styles";
```

```tsx
import {
  Button,
  Card,
  Checkbox,
  Input,
  Popover,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  Tooltip,
} from "@buttercream/react";

export function Example() {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>Ready to go</Card.Title>
          <Card.Description>Composed, themeable, and accessible.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Input aria-label="Email" fullWidth name="email" placeholder="Email" />
          <Checkbox defaultChecked>Remember this device</Checkbox>
          <RadioGroup defaultValue="daily" label="Digest frequency" name="digest">
            <RadioGroup.Item value="daily">Daily</RadioGroup.Item>
            <RadioGroup.Item value="weekly">Weekly</RadioGroup.Item>
          </RadioGroup>
          <Slider defaultValue={50} label="Volume" name="volume" />
          <Select
            items={[
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
            ]}
            label="Summary"
            name="summary"
            placeholder="Select frequency"
          >
            <Select.Item value="daily">Daily</Select.Item>
            <Select.Item value="weekly">Weekly</Select.Item>
          </Select>
          <Switch>Product updates</Switch>
        </Card.Content>
        <Card.Footer>
          <Button>Continue</Button>
        </Card.Footer>
      </Card>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="details">Details</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">Overview content</Tabs.Panel>
        <Tabs.Panel value="details">Details content</Tabs.Panel>
      </Tabs>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger render={<Button variant="tertiary" />}>Help</Tooltip.Trigger>
          <Tooltip.Content arrow>More information</Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
      <Popover>
        <Popover.Trigger render={<Button variant="tertiary" />}>Open</Popover.Trigger>
        <Popover.Content>
          <Popover.Title>Shortcuts</Popover.Title>
          <Popover.Description>Use the command palette to jump anywhere.</Popover.Description>
        </Popover.Content>
      </Popover>
    </>
  );
}
```

## Repository

- `apps/editor`: hosted TanStack Start editor for Cloudflare Workers
- `packages/react`: Base UI-backed React components
- `packages/styles`: Tailwind v4 CSS, tokens, and BEM component styles
- `packages/cli`: read-only theme exports
- `packages/theme-core`: private design-system schema and generators
- `skills/buttercream`: installable agent skill

Read [CONTEXT.md](./CONTEXT.md) for the product model and `docs/adr/` for durable decisions.

## Portable design systems

The hosted editor stores one canonical schema-versioned document. Its **Code** view projects that
document into:

- `global.css`
- `DESIGN.md`
- `buttercream.json`
- `design-system.json`

Import accepts either the complete JSON document or generated CSS. JSON replaces the complete
editor state. CSS replaces recognized theme variables and resets omitted variables to defaults.
The current JSON Schema is served from `https://buttercream.studio/schema.json`.

## Editor development

Copy `.env.example` to `.env` and add the Hugeicons Pro license key before installing dependencies.
Copy `apps/editor/.env.example` to `apps/editor/.env.local`, add the Clerk development keys, and
optionally configure the local-only automatic sign-in values. Development uses the hosted D1
database configured in `apps/editor/wrangler.jsonc`.

```bash
bun run dev
```
