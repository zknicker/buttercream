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
- A **preview** renders Buttercream components with the current design system in an isolated frame.
- **Custom CSS** is authored BEM and utility CSS stored separately from structured theme tokens.
- **Agent rules** are project-specific design instructions exported as `DESIGN.md`.
- **Component settings** are typed default props for Buttercream components.
- `buttercream.json` associates a consuming repository with a hosted design system and export paths.

## Invariants

1. The structured design-system document is canonical; generated files are projections.
2. Imports replace recognized theme variables and reset missing values to defaults.
3. Custom CSS is edited separately and is not inferred from arbitrary imported rules.
4. The editor shell never inherits the theme being edited.
5. Saved systems are private unless sharing is explicitly enabled.
6. `/ds/:id` is the only public design-system route. Owners edit; shared visitors read.
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
| `@buttercream/styles` | Semantic tokens, BEM classes, variants, and default preset CSS |
| `@buttercream/cli` | Read-only hosted exports to stdout |
| `@buttercream/theme-core` | Private schema, defaults, CSS parsing/generation, and guidance generation |
| Editor | Auth, persistence, visual controls, generated guides, isolated previews, import/export |
| Skill | Stable agent workflow for installation, component use, theming, and repository integration |
