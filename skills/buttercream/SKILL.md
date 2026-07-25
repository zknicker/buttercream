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

Do not add a Tailwind plugin or `tailwind.config.js` for Buttercream.

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
- Use `className` for local layout. Put reusable visual changes in theme tokens or public BEM rules.

## Theme

Use semantic variables:

```css
[data-theme="light"],
[data-theme="default"] {
  --background: #f8f8f8;
  --foreground: #292524;
  --accent: #1b1b1b;
  --accent-foreground: #ffffff;
}

[data-theme="dark"] {
  --background: #161514;
  --foreground: #f5f5f4;
  --accent: #f5f5f4;
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

