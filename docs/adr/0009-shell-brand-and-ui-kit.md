# 0009: Shell brand and shell UI kit

The Buttercream brand is warm-neutral editorial typography with hard-edged pixel and ordered-dither
accents. The chrome stays quiet on purpose: visitors are evaluating their own components inside it,
so the shell must never out-shout the preview.

Type is Young Serif for display, Geist for body and UI, and Departure Mono for labels, token names,
prices, and code.

**Every face is SIL Open Font License 1.1 and checked into the repo**, so a fresh clone renders
correctly with no setup step. That constraint drove the choice. An earlier revision used Recoleta
and Söhne, which are commercially licensed: their trial files may not be distributed outside your
organisation at all, and retail webfont licences generally also prohibit redistributing the files in
a public repository. Since this repo is public under Apache-2.0, no licensed face can live in it —
buying licences would not have changed that. Open faces were the only option that lets the design
ship as source.

## Surfaces are neutral; character comes from accents

**Every shell surface is pure neutral grey — zero chroma.** Butter `#F0B429` is the accent, with
frosting, pistachio, crust, berry, and honey as semantic signals and rare highlights.

The studio frames a live preview of whatever theme the user is building. A tinted canvas has no way
to sit correctly against an arbitrary user background: warm chrome around a cool preview reads as a
mismatched border, not as warmth, and the effect gets worse the more opinionated the user's theme
is. Neutral chrome is compatible with every theme by construction — the same reason tools like
HeroUI settle on greys.

An earlier revision used a parchment canvas with crumb surfaces, on the theory that marketing pages
could stay warm even if the studio could not. That split was dropped: brand expressed through
background tint is weak brand anyway, and maintaining two surface scales for one component kit costs
more than it returns. The identity carries fine without it — the pixel cupcake, the dither bands,
the display serif, the pixel-grid mono, and butter used with intent.

Parchment and ink survive as fixed tokens for cases where the surface underneath is known: label
text on a butter or berry fill, logo artwork, palette specimens. They are no longer surfaces.

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

**Until that switch is made deliberately, the editor must not depend on `@buttercream/react`.** It
is not in `apps/editor/package.json`, and shell components wrap Base UI primitives directly. Reaching
for a published component one at a time couples the studio's build to the package's release state
before the system is ready to carry it — a stale `dist` becomes a failing typecheck in the app, and
the boundary that keeps the chrome independent erodes without anyone deciding to move it. Adopting
the package is a single, intentional migration, not a drip.

## Tailwind wiring

The editor uses `@tailwindcss/vite`. This remains CSS-first — no Tailwind plugin, no
`tailwind.config.js`. `noRedundantRoles` is disabled in `biome.json` because Tailwind's preflight
removes list markers, which drops list semantics in Safari unless `role="list"` is explicit.
