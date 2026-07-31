---
name: buttercream
description: Integrate, use, theme, and maintain Buttercream React component systems. Use when a repository contains buttercream.json, imports @buttercream/react or @buttercream/styles, needs Buttercream components or variants, changes global theme tokens or public BEM classes, exports a hosted Buttercream design system, or updates project DESIGN.md guidance from Buttercream Studio.
---

# Buttercream

Use the hosted design-system document as canonical. Treat its CSS, visual guides, component
previews, JSON, and `DESIGN.md` as generated projections.

## Orient

1. Read `buttercream.json` when present.
2. Read the configured CSS and guidance files before editing.
3. Inspect installed `@buttercream/*` versions and keep them aligned.
4. Use repository-local instructions and checks.

Expected association file:

```json
{
  "$schema": "https://buttercream.studio/schema.json",
  "designSystem": "https://buttercream.studio/ds/example",
  "css": "src/styles/global.css",
  "guidance": "DESIGN.md"
}
```

This file associates the repository with Buttercream. It does not contain theme state.

## Install

Use the repository's package manager:

```bash
bun add @buttercream/react @buttercream/styles
```

Add the CSS imports in this order:

```css
@import "tailwindcss";
@import "@buttercream/styles";
```

Tailwind itself is required -- it's a declared peer dependency of `@buttercream/styles`, and that
is deliberate. Only a Tailwind plugin is declined: do not add one, and skip `tailwind.config.js`.
See `docs/adr/0008-theming-pipeline.md` (in the Buttercream repo itself) for the reasons.

## Build interfaces

Prefer exported Buttercream components over new primitives:

```tsx
import { Button, Card } from "@buttercream/react";

export function Confirmation() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Publish changes?</Card.Title>
        <Card.Description>This updates the shared theme.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button>Publish</Button>
        <Button variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  );
}
```

- Preserve compound structure such as `Card.Header` and `Avatar.Fallback`.
- Use native React behavior names such as `disabled`, `onClick`, and `render`.
- Expect Base UI state attributes such as `data-disabled`.
- Skip an interactive component when Buttercream does not export it. Do not substitute another
  primitive library without explicit project approval.
- Lean on built-in derivation before wiring props manually. `Sidebar.MenuButton` derives its
  collapsed-rail tooltip from the row's `Sidebar.MenuLabel` automatically — opening on the
  sidebar's outward side and portalling into the sidebar's `portalContainer` — so plain rows
  need no `tooltip` prop; pass a string to override the text or `false` to disable. Nested
  rows use the same `Sidebar.MenuLabel` as top-level rows.
- Slot components are often real primitives underneath and accept their props:
  `Sidebar.MenuBadge` is a `Chip`, so `color="success"` gives the green "New" treatment.
  For trailing text that is not a count — timestamps, shortcut hints — use `Sidebar.MenuChip`:
  bare muted caption text with tabular numerals, no pill.
- Follow the icon family, treatment, package, and import pattern in the generated `DESIGN.md`.
  Do not mix icon families in one interface unless the guidance explicitly allows it.
- Keep icon-only controls labeled and mark decorative icons as hidden from assistive technology.
- Use `className` for local layout. Put reusable visual changes in theme tokens or public BEM rules.

## Theme

The hosted editor edits one JSON document, a `DesignSystem` -- ~49 authored tokens per theme
(light/dark): five colour roles, a neutral anchor, radius, density, shadow levels, fonts. It stores
intent, not implementation -- `shadow: "medium"`, never a literal shadow stack. (Defined in
`packages/theme-core/src/design-system.ts` and `packages/theme-core/src/defaults.ts`, in the
Buttercream repo itself -- these aren't shipped to a consuming repo's `node_modules`, so don't try
to read them from there.)

Export writes those tokens as CSS custom properties inside `@layer theme`, into the consumer's
`global.css`. The light block's selector list is `:root, [data-theme="light"],
[data-theme="default"]`, mirroring the shipped defaults, so dropping the exported file in applies
immediately -- `data-theme` is for switching to dark or scoping a themed subtree, never a
prerequisite for the theme to apply at all. A consumer's imported `global.css` overrides the
shipped defaults purely by import order: both sit in `@layer theme` at equal specificity, and the
consumer's `@import` comes after `@import "@buttercream/styles"`, so it wins for every token it
redeclares. No `!important`, no config merge. Full flow (configure -> preview -> export -> consume)
and the layer-order mechanism are in `docs/adr/0008-theming-pipeline.md`, in the Buttercream repo
itself -- read it there before explaining theming to a user; it isn't shipped to consuming repos
either.

The theme tokens round-trip exactly through CSS (export then import reproduces the document), but
CSS is not the lossless format: import only ever restores `theme.light` / `theme.dark`, never
`customCss`, `icons`, or `components`, even though export does write `customCss` into the file.
`design-system.json` is the lossless document format; treat CSS round-tripping as tokens-only.

`shadow`, `radius`, and density are intent-level tokens, not literal CSS values. Their consequences
are computed in the shipped stylesheet: `--radius` becomes the radius step scale and nested-corner
math, `shadow: "medium"` becomes a reference into a hand-tuned three-tier stack (e.g.
`--bc-shadow-field-medium`), and `--accent` plus the neutral anchor become the whole derived colour
ladder (hover/soft/foreground variants, greys, chart-ladder stops). The two authored `@layer theme`
blocks hold exactly the document's tokens; everything derived or hand-tuned -- `color-scheme`, the
shadow stacks, the chart ladder -- lives in adjacent blocks under the same selectors. In a
consuming repo, read the real values at `node_modules/@buttercream/styles/src/theme-defaults.css`
(generated from the document, and imported by `theme.css` alongside the derived rules) rather
than restating them here -- this doc has already drifted from the source once and is not a place to
keep a third hand-maintained copy. If a theming request looks like it needs a new literal token,
check whether that file already derives it before adding one.

Example is illustrative -- a made-up brand colour, not the shipped palette:

```css
:root,
[data-theme="light"],
[data-theme="default"] {
  --background: #f8f8f8;
  --foreground: #292524;
  --accent: #7c3aed;
  --accent-foreground: #ffffff;
}

[data-theme="dark"] {
  --background: #161514;
  --foreground: #f5f5f4;
  --accent: #a78bfa;
  --accent-foreground: #1c1917;
}
```

Use unprefixed public BEM classes:

```css
.button--primary {
  text-transform: uppercase;
}

.card__title {
  letter-spacing: -0.02em;
}
```

Type scaling follows Tailwind's contract: the design system's font-size scale is baked into the
`--text-*` theme variables, so `text-sm`, `text-base`, and friends move with the document's Font
Size token — while bare, un-classed text stays at the browser default exactly as stock Tailwind
leaves it. Size text with utilities; do not resize the root font.

Prefix private implementation variables with `--bc-*`. Keep both light and dark theme sets complete.
Do not add component-local arbitrary colors when a reusable semantic token is missing; add the token
first.

## Export from Studio

Export one artifact to stdout:

```bash
bunx @buttercream/cli export \
  "https://buttercream.studio/ds/example" \
  --format css
```

Formats:

- `css`: complete `global.css`
- `design-md`: project-specific design guidance
- `json`: portable design-system document

For private systems, use the authenticated CLI setup supported by the installed version. Never
print, commit, or paste API keys into project files.

When applying an export:

1. Read the existing destination.
2. Fetch the export without redirecting over the destination.
3. Compare the export with the destination.
4. Apply the change using normal repository file tools.
5. Show the diff and run focused checks.

Buttercream CLI itself must remain read-only and must never mutate the consuming repository.
