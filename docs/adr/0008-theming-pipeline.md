# 0008: The theming pipeline

## The four-step flow

1. **Configure.** The user moves controls in the hosted editor. Every control writes to one JSON
   document, a `DesignSystem` (`packages/theme-core/src/design-system.ts`). It holds ~49 authored
   tokens per theme, light and dark: five colour roles, a neutral anchor, radius, density scales,
   shadow levels, fonts. The exact list is `variablePaths` in `packages/theme-core/src/css.ts`. The
   document stores intent, not implementation -- `shadow: "medium"`, never a shadow stack.

2. **Preview.** The editor reads the document with `themeCssVariables` and writes the result as
   inline CSS custom properties on the preview wrapper (`apps/editor/src/studio/editor-shell.tsx`),
   then renders real `@buttercream/react` components inside it. Nothing in the preview is mocked.

3. **Export.** `exportGlobalCss` (`packages/theme-core/src/css.ts`) emits a `global.css`:

   ```css
   @import "tailwindcss";
   @import "@buttercream/styles";

   @layer theme {
     :root,
     [data-theme="light"],
     [data-theme="default"] {
       --accent: #0485f7;
       /* …49 tokens */
     }

     [data-theme="dark"] {
       --accent: #0485f7;
       /* …49 tokens */
     }
   }
   ```

   `importThemeCss` parses that same shape back into a `DesignSystem` -- but it only replaces
   `theme.light` / `theme.dark`. It never restores `rules.customCss`, `icons`, or `components`,
   even though `exportGlobalCss` writes `customCss` into the file. The theme tokens round-trip
   exactly; `design-system.json` (the full document) is the lossless format -- "lossless" does not
   extend to the CSS path.

4. **Consume.** The user already has Tailwind v4 -- it is a hard peer dependency of
   `@buttercream/styles`. They add `@buttercream/react` and `@buttercream/styles`, drop in the
   exported `global.css` -- which already applies with no further setup, since its `@layer theme`
   blocks target `:root` as well as `[data-theme="light"]` / `[data-theme="default"]` /
   `[data-theme="dark"]` -- and write markup:

   ```tsx
   <Button variant="secondary">Save</Button>
   ```

   renders

   ```html
   <button class="button button--secondary">Save</button>
   ```

   `@buttercream/styles` ships the BEM rules written against the same variables the export
   overrides.

## Why the user's values win

The shipped defaults and the user's export both declare inside `@layer theme`, at equal
selector specificity, on the same selectors (`[data-theme="light"]`, `[data-theme="dark"]`, …).
Cascade layers do not do specificity contests across declarations in the same layer -- inside one
layer, later wins. There is no separate import to sequence here: the exported `global.css` itself
contains both `@import "tailwindcss"` and `@import "@buttercream/styles"` at its top (see the
Export step above), followed by the user's own `@layer theme` block, so within that one file the
shipped defaults are always parsed first and the user's block is always the one applied last for
every token it redeclares. No override syntax, no `!important`, no config merge -- import and
declaration order is the whole mechanism, and it is verifiable by reading the file top to bottom.

`data-theme` is an attribute, not a document-level mode: it can be set on any element, so a dark
panel can sit inside a light page, and vice versa.

## Decisions vs. consequences

**The document owns decisions. The CSS owns consequences.** The user sets ~49 things;
`packages/styles/src/theme.css` derives hundreds. `--accent` becomes hover, soft, and foreground
variants. `--radius` becomes the radius steps and the nested-corner math. `--foreground` plus the
neutral anchor becomes the whole grey ladder.

`shadow: "medium"` is the clearest case. The document stores a level, not a shadow. `theme.css`
authors three real stacks per surface -- `--bc-shadow-field-subtle`, `-medium`, `-strong` (and the
same for `overlay` and `surface`) -- and the public `--shadow-field` / `--shadow-overlay` /
`--shadow-surface` tokens hold a reference into whichever level is selected:

```css
--shadow-field: var(--bc-shadow-field-medium);
```

`serializeValue` in `packages/theme-core/src/css.ts` is what turns the document's `"medium"` into
that `var(...)` reference on export, and `parseValue` is what reads it back into a level on import.
The three stacks themselves are never document state -- they are hand-tuned CSS, not generated
from the document.

The document's tokens arrive from the generated `theme-defaults.css`, which `theme.css` imports.
`color-scheme`, the chart-ladder stops (`--bc-chart-l1..l5`), and the `--bc-shadow-*` stacks live
in `theme.css` itself, in blocks on the same selectors, alongside the rest of
`theme.css`'s derived and hand-tuned consequences -- radius steps, text scale, derived colour
variants -- none of which has any business being represented in JSON.

## Why no Tailwind plugin

Tailwind itself is required -- it is a declared peer dependency of `@buttercream/styles`, and that
is deliberate. Only a Tailwind *plugin* is declined, for four reasons:

1. **Layer order.** A plugin's `addBase` output lands in Tailwind v4's `base` layer, which loses to
   a consumer's `@layer theme` override. The whole mechanism in the section above depends on the
   shipped defaults being authored CSS inside `@layer theme` -- a plugin can't put them there.
2. **Coverage.** Only the two authored blocks have any representation in the document at all (the
   decisions/consequences split above); most of `theme.css` is consequence. A plugin can generate no
   more than codegen can generate, so "zero CSS files" is unreachable regardless of mechanism; the
   consequences either stay as shipped CSS or get stringified into JS, which is strictly worse to
   read.
3. **Agent legibility.** `skills/buttercream/SKILL.md` tells agents to read the configured CSS
   directly. A stylesheet in `node_modules` is greppable; a plugin's emitted output does not exist
   until something builds it.
4. **Idiom.** Tailwind v4 itself moved configuration into CSS (`@theme`, `@custom-variant`), which
   `theme.css` already uses natively. A JS plugin is v4's compatibility path for v3 holdouts, not
   the idiomatic one.

An older line in `docs/adr/0001-packages-and-css.md` -- "Buttercream does not require a Tailwind
plugin or JavaScript configuration file" -- states the rule without the reasons; this record is
where the reasons live.

## Reference: HeroUI (2026-07-28)

Buttercream's visual reference is heroui.pro; component specimens are reproduced onto Base UI.
Current HeroUI is CSS-first -- the same shape as Buttercream:

```css
@import "tailwindcss";
@import "@heroui/styles";
```

plus CSS custom properties, BEM classes, and `[data-theme]` blocks. No JS plugin required.

The `@heroui/theme` npm package -- zero shipped CSS, defaults kept as JS objects, a `./plugin`
entry using Tailwind's `addBase` -- is HeroUI **v2**, built for **Tailwind v3**, where a JS plugin
was the only config mechanism available. HeroUI's v2.8 Tailwind-v4 support (July 2025) kept that
plugin only as a compatibility shim for existing v2 consumers.

A prior agent researched `@heroui/theme`, found the plugin, concluded HeroUI was JS-source-of-truth,
and nearly rewrote Buttercream's theming to copy a mechanism HeroUI had already moved away from.
Do not repeat this. HeroUI's own trajectory -- v2's JS-plugin config to the current CSS-first
system -- moved *toward* the architecture this record describes, so "follow the reference" supports
this ADR, not the v2 package.

This paragraph describes a moving target as of the date above. A future reader should re-verify
HeroUI's current architecture rather than assume this note still holds.

## Invariant: shipped defaults equal document defaults

`defaults.ts` (`packages/theme-core/src/defaults.ts`) is the source of truth for the default
preset, and `packages/styles/src/theme-defaults.css` is printed from it by
`packages/styles/scripts/generate-theme-defaults.ts` — which calls the same `themeLayerCss` that
writes a consumer's export. The default preset is therefore the default document's own export, not
a transcription of it, and the two cannot disagree.

They could before, and did: commit `0a06369` recalibrated `defaults.ts` without carrying the change
into `theme.css`, and five light-theme tokens sat wrong until it was found by audit. It was
invisible because the editor inlines tokens (step 2), shadowing the shipped blocks entirely — only
a consumer who installs the package and never themes it renders them.

Two tests guard the file, and it is worth being exact about what each one can catch:

- `packages/styles/src/theme-defaults.test.ts` asserts the committed bytes equal what the generator
  prints. This catches a hand edit to a generated file. It cannot catch a wrong generator, since
  both sides come from it.
- `packages/theme-core/src/theme-css-pin.test.ts` re-reads the shipped file and compares every
  declaration against the token registry. Its extraction is independent — it regex-parses committed
  bytes — so it catches a truncated file, a broken selector, a dropped registry entry, or a token
  that serializes to nothing. Its *values* are not independent: `themeCssVariables` and
  `serializeTheme` share `variablePaths`, `getThemeValue` and `serializeValue`, so a bug inside
  `serializeValue` would produce a wrong file that both tests accept.

The independent anchor against that last case is `packages/theme-core/src/css.test.ts`, which pins
hand-written literals covering each distinct value shape — hex, `rgb()`, `oklch()`, `color-mix()`,
bare numbers, lengths, keywords, and the `var(--bc-shadow-*)` level references. A serializer that
broke a shape fails there. Keep that coverage shape-complete rather than token-complete: pinning
all 49 by hand would reintroduce the transcription this record exists to remove.

Generation is possible at all only because the shipped blocks hold exactly the document's 49 tokens
and nothing else (see "Decisions vs. consequences" above). Before the styles-owned values moved out,
printing over those blocks would have deleted every shadow stack in the system.
