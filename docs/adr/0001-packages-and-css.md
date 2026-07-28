# 0001: Separate behavior from styles

Buttercream publishes three lockstep packages:

- `@buttercream/react` for React behavior and composition
- `@buttercream/styles` for CSS tokens and BEM classes
- `@buttercream/cli` for read-only hosted exports

React and CSS remain independently consumable. Component behavior uses Base UI and native React
events. Styling is Tailwind v4 CSS-first:

```css
@import "tailwindcss";
@import "@buttercream/styles";
```

Public component classes and semantic tokens remain unprefixed. Private implementation variables
use `--bc-*`. Tailwind v4 itself is required -- it is a declared peer dependency of
`@buttercream/styles`, and consumers are expected to already have it. Only a Tailwind *plugin* is
declined; see `docs/adr/0008-theming-pipeline.md` for why.

