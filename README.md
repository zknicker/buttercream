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
  Drawer,
  Input,
  Modal,
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
      <Modal>
        <Modal.Trigger render={<Button variant="tertiary" />}>Open modal</Modal.Trigger>
        <Modal.Portal>
          <Modal.Backdrop variant="blur" />
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Welcome</Modal.Heading>
              </Modal.Header>
              <Modal.Body>Focused content.</Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Portal>
      </Modal>
      <Drawer>
        <Drawer.Trigger render={<Button variant="tertiary" />}>Open drawer</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Content placement="right">
            <Drawer.Dialog>
              <Drawer.Header>
                <Drawer.Heading>Settings</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>Supplementary content.</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer>
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
document—including theme tokens, component defaults, and icon authoring settings—into:

- `global.css`
- `DESIGN.md`
- `buttercream.json`
- `design-system.json`

Import accepts either the complete JSON document or generated CSS. JSON replaces the complete
editor state. CSS replaces recognized theme variables and resets omitted variables to defaults.
The current JSON Schema is served from `https://buttercream.studio/schema.json`.

## Using an exported theme

You already have Tailwind v4—it's a peer dependency of `@buttercream/styles`. Install the packages
above, then use the editor's exported `global.css` as your stylesheet entry point instead of
hand-writing the `@import` block:

```css
@import "tailwindcss";
@import "@buttercream/styles";

@layer theme {
  :root,
  [data-theme="light"],
  [data-theme="default"] {
    --accent: #0485f7;
    /* …49 tokens */
  }

  [data-theme="dark"] {
    --accent: #0485f7;
    /* …49 tokens */
  }
}
```

The exported file already contains both `@import` lines, so it applies as-is—no extra setup, and
no separate stylesheet importing it after `@buttercream/styles` (that would just duplicate the
imports). Its `:root` block means the theme is live the moment the file loads; `data-theme` isn't
a prerequisite for the theme to apply.

Its tokens win over the defaults shipped in `@buttercream/styles`: both declare inside the same
`@layer theme`, at equal specificity, and later wins within a layer—no `!important`, no config
merge.

Components render real BEM classes against those variables—`<Button variant="secondary">` renders
`class="button button--secondary"`—so styling is CSS you can read, not a runtime theme prop.

`data-theme` is for switching or scoping, not for turning the theme on: set `data-theme="dark"` on
an element to switch that subtree to dark (or `"light"` to force light), so a dark panel can sit
inside an otherwise light page.

See [docs/adr/0008-theming-pipeline.md](./docs/adr/0008-theming-pipeline.md) for the full pipeline,
including why the document only stores ~49 tokens and how the rest of `theme.css` is derived.

## Editor development

Copy `.env.example` to `.env` and fill it in — the Hugeicons Pro licence key is read at install
time, so set it before running `bun install`. Everything else in that file is Clerk's, including
the optional local-only automatic sign-in values.

One env file per checkout. `apps/editor/.env.local` is a symlink to it, because Vite and the
Cloudflare plugin both resolve the environment relative to `apps/editor` and neither follows the
repository root on its own. `scripts/bootstrap-checkout.sh` creates that link, and seeds a new
worktree's `.env` from the main checkout — a worktree materialises tracked files only, so it starts
with no environment at all and fails at the first request with a missing Clerk secret. A
`SessionStart` hook runs it, and it is safe to run by hand at any time.

Development uses the hosted D1 database configured in `apps/editor/wrangler.jsonc`.

```bash
bun run dev
```
