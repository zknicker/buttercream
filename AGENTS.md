# Buttercream agent guidance

- Read `CONTEXT.md` and relevant `docs/adr/` records before changing architecture.
- Keep the editor shell theme isolated from design-system preview styles.
- Keep the editor shell independent from `@buttercream/react`; use Base UI and internal shell CSS.
- Treat `DesignSystem` as canonical. CSS, guides, previews, and `DESIGN.md` are projections.
- Use Base UI behavior and native React event names. Skip interactive components without a suitable Base UI primitive.
- Keep semantic theme tokens and public BEM classes unprefixed. Prefix private implementation variables with `--bc-`.
- Author preview demo chrome as Tailwind utilities in the specimen JSX — exactly what a consumer
  would write, visible in the Code tab. Reserve `apps/editor/src/styles/preview.css` for editor
  scaffolding (frames, specimen grid); BEM classes exist purely as the components' theming surface.
- Keep `@buttercream/react`, `@buttercream/styles`, and `@buttercream/cli` on one version.
- Do not add Tailwind plugins or `tailwind.config.js`; Buttercream is Tailwind v4 CSS-first.
- Never make the CLI write into a consuming repository. Export to stdout and let the caller decide where output goes.
- Use `bun run dev`; it binds the hosted production D1. Use `bun run dev:local` only when the task explicitly needs isolated local data, and migrate that database first.
- Run `bun run check` before committing.
