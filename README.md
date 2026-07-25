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
import { Button, Card } from "@buttercream/react";

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Ready to go</Card.Title>
        <Card.Description>Composed, themeable, and accessible.</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button>Continue</Button>
      </Card.Footer>
    </Card>
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

