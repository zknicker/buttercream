# Buttercream

Buttercream is a themeable React component system and hosted visual editor. It gives humans and
agents one canonical design-system document and projects that document into components, CSS,
guides, previews, and project-specific agent guidance.

## Product nouns

- A **design system** is one hosted, account-owned, schema-versioned `DesignSystem` document.
- A **user** is a Buttercream-owned `usr_*` identity linked to one Clerk authentication identity.
- A **theme** is the light and dark token state inside a design system.
- A **preset** is a reusable starting value for a new design system.
- A **guide** is a generated view of the current design system.
- A **preview** renders Buttercream components with the current design system in a `@scope`-contained
  surface, themed with inline custom properties -- not an iframe. Scoping is per surface, so one page
  can render many previews of different systems without their custom CSS colliding.
- The **workspace** is `/systems`: an account's own design systems, each card a live miniature
  preview of that system. Opening one enters the editor.
- **Custom CSS** is authored BEM and utility CSS stored separately from structured theme tokens.
- **Agent rules** are project-specific design instructions exported as `DESIGN.md`.
- **Component settings** are typed default props for Buttercream components.
- **Icon settings** select the project icon family, treatment, size, and stroke width for previews
  and generated authoring guidance.
- `buttercream.json` associates a consuming repository with a hosted design system and export paths.

## How a theme reaches an app

Full mechanism, including the cascade-layer mechanics and the no-Tailwind-plugin rationale:
`docs/adr/0008-theming-pipeline.md`.

1. **Configure.** Editor controls write one JSON `DesignSystem` document (~49 tokens per theme,
   light and dark). It stores intent -- `shadow: "medium"` -- never implementation.
2. **Preview.** The editor writes those tokens as inline CSS custom properties on the preview
   wrapper (`apps/editor/src/studio/editor-shell.tsx`) and renders real `@buttercream/react`
   components inside. Nothing in the preview is mocked.
3. **Export.** `exportGlobalCss` emits a `global.css` with two `@layer theme` blocks
   (`:root, [data-theme="light"], [data-theme="default"]`, and `[data-theme="dark"]`).
   `importThemeCss` parses that same shape back into a document, so the theme tokens round-trip
   exactly -- but `design-system.json` is the lossless document format (invariant 12): CSS
   import never restores `rules.customCss`, `icons`, or `components`.
4. **Consume.** The user already has Tailwind v4. They add `@buttercream/react` and
   `@buttercream/styles`, drop in the exported `global.css`, and write markup like
   `<Button variant="secondary">`. The user's values win because the shipped defaults and their
   export both sit in `@layer theme` at equal specificity, and the import comes later in document
   order -- later wins, no override syntax needed.

**The document owns decisions; the CSS owns consequences.** The user sets ~49 things;
`packages/styles/src/theme.css` derives hundreds -- accent hover/soft/foreground variants, radius
steps, the grey ladder, three-tier shadow stacks. The two authored `@layer theme` blocks hold
exactly those 49 document tokens; `color-scheme`, the chart-ladder stops (`--bc-chart-l1..l5`),
and the `--bc-shadow-*` stacks live in adjacent blocks with the same selectors -- derived and
hand-tuned consequences that have no business being stored as JSON.

## Invariants

1. The structured design-system document is canonical; generated files are projected from it. The
   default preset is no exception: `styles/src/theme-defaults.css` is printed from the default
   document by the same function that writes a consumer's export.
2. Imports replace recognized theme variables and reset missing values to defaults.
3. Custom CSS is edited separately and is not inferred from arbitrary imported rules.
4. The editor shell never inherits the theme being edited.
5. Saved systems are private unless sharing is explicitly enabled.
6. `/ds/:id` is the only public design-system route. Owners edit; shared visitors read. `/systems`
   lists an account's own systems and is never public.
7. Undo and redo are browser-memory concerns and disappear on reload.
8. Server writes use an integer version; the first edit against stale state opens a conflict dialog.
9. The CLI reads and exports. It does not mutate consuming repositories.
10. Public packages share one release version.
11. Product records reference Buttercream user IDs, never Clerk user IDs.
12. `design-system.json` is the lossless portable backup; CSS import only replaces theme variables.

## Layers

| Layer | Owns |
| --- | --- |
| `@buttercream/react` | React behavior, compound component APIs, and Base UI composition |
| `@buttercream/styles` | Semantic tokens, BEM classes, variants, and default preset CSS (hand-authored today, pinned equal to `theme-core`'s defaults by test) |
| `@buttercream/cli` | Read-only hosted exports to stdout |
| `@buttercream/theme-core` | Private schema, canonical defaults (`defaults.ts`), CSS parsing/generation, and guidance generation |
| Editor | Auth, persistence, visual controls, generated guides, isolated previews, import/export |
| Skill | Stable agent workflow for installation, component use, theming, and repository integration |
