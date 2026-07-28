# Charts

Vendored from the [bklit](https://bklit.com) shadcn registry (`https://ui.bklit.com/r/{name}.json`),
resolved transitively from `line-chart`, `bar-chart` and `area-chart` — 12 registry items, 80
files. The plotting is built on `@visx` and `motion`.

## What was changed on the way in

Everything else is byte-for-byte theirs, so a future refetch stays a small diff.

- **`cn`** — the source imports a shadcn `@/lib/utils` helper (clsx wrapped in tailwind-merge).
  Rewritten to `./utils.ts`, which re-exports this project's own `classes` joiner. There is no
  Tailwind here, so there is nothing to merge.
- **Tailwind classes** — the 39 utility strings in the source became BEM classes styled in
  `@buttercream/styles`, matching the rule that no component source carries Tailwind. Two of them
  hardcoded `bg-zinc-900 / dark:bg-zinc-100`; those now read theme tokens.
- **Flattened layout** — the registry ships files under `src/charts/` and `src/components/`;
  they live side by side here, so `../foo` imports became `./foo`.
- **Typechecking** — `tsconfig.charts.json` relaxes `exactOptionalPropertyTypes` and
  `noImplicitAny` for this directory only. Held to the same strictness as our own code the
  vendored source reports ~50 errors that are not defects, only a stricter host. Our authored
  code stays strict; see `tsconfig.json`, which excludes this directory.

## Colour

No colour is decided in this directory. Every paint reads a `--chart-*` custom property, and
`theme.css` maps all of them onto semantic tokens. To restyle a chart, change the tokens.
