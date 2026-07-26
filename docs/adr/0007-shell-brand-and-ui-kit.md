# 0007: Shell brand and shell UI kit

The Buttercream brand is warm-neutral editorial typography with hard-edged pixel and ordered-dither
accents. The chrome stays quiet on purpose: visitors are evaluating their own components inside it,
so the shell must never out-shout the preview.

Dominant palette: parchment `#FAF7F0`, ink `#1C1815`, butter `#F0B429`, crumb `#F2EDE3`. Supporting
colors — frosting, pistachio, crust, berry, honey, graphite — appear only as semantic signals and
rare accents. Type is Recoleta for display, Söhne for body and UI, Departure Mono for labels, token
names, prices, and code. Recoleta and Söhne are licensed; only Departure Mono is checked in. See
`apps/editor/public/fonts/README.md`.

Three motifs carry the identity and are not used anywhere else: the pixel cupcake mark, the
ordered-dither band that replaces hairline rules between major sections, and a single hand-piped
frosting-swirl underline per page.

## Shell tokens are not design-system tokens

Shell tokens live in `apps/editor/src/styles/shell.css` under Tailwind's `@theme` and are named for
brand nouns (`--color-parchment`, `--color-ink`). They are deliberately unrelated to the semantic
tokens in `@buttercream/styles` (`--background`, `--foreground`, `--accent`), which belong to the
design system being edited. Previews stay in an isolated iframe, so the two never mix — this is the
mechanism behind invariant 4.

## The shell UI kit is scaffolding

`apps/editor/src/ui/` holds the components the shell is built from. Its prop surface intentionally
mirrors `@buttercream/react` — same `variant` and `size` vocabularies, same compound-component
shape, same Base UI primitives, same `useRender` and `data-slot` composition. Only the styling
differs: the kit is Tailwind utilities against shell tokens, while the published package is BEM
against semantic tokens.

The intent is to replace the kit with `@buttercream/react` once the published components cover the
studio's needs, making the product build from the design system it edits. Keeping the APIs aligned
means that swap is an import change rather than a rewrite. New shell components should follow the
same rule: if `@buttercream/react` has or will have an equivalent, match its API.

## Tailwind wiring

The editor uses `@tailwindcss/vite`. This remains CSS-first — no Tailwind plugin, no
`tailwind.config.js`. `noRedundantRoles` is disabled in `biome.json` because Tailwind's preflight
removes list markers, which drops list semantics in Safari unless `role="list"` is explicit.
