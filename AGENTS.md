# Buttercream agent guidance

- Read `CONTEXT.md` and relevant `docs/adr/` records before changing architecture.
- Keep the editor shell theme isolated from design-system preview styles.
- Treat `DesignSystem` as canonical. CSS, guides, previews, and `DESIGN.md` are projections.
- Use Base UI behavior and native React event names. Skip interactive components without a suitable Base UI primitive.
- Keep semantic theme tokens and public BEM classes unprefixed. Prefix private implementation variables with `--bc-`.
- Keep `@buttercream/react`, `@buttercream/styles`, and `@buttercream/cli` on one version.
- Do not add Tailwind plugins or `tailwind.config.js`; Buttercream is Tailwind v4 CSS-first.
- Never make the CLI write into a consuming repository. Export to stdout and let the caller decide where output goes.
- Run `bun run check` before committing.

