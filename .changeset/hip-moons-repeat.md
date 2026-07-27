---
"@buttercream/react": minor
"@buttercream/styles": minor
---

Rebuild the theme on heroui.pro's token model and match components to it.

Semantic roles are now `accent`, `default`, `success`, `warning`, and `danger`, each carrying a
derived `-hover`, `-soft`, `-soft-foreground`, and `-soft-hover`. Surfaces gain a `--surface`
family, form controls gain their own `--field-*` family, and one `--radius` base drives an
`xs`–`4xl` scale. Shadows are chosen as `none | subtle | medium | strong` per surface and are
authored separately for light and dark, so a light theme no longer inherits a dark theme's
elevation.

Breaking token changes: `--card`/`--card-foreground` become `--surface`/`--surface-foreground`,
`--ring` becomes `--focus`, `--form-radius` becomes `--field-radius`, `--field-shadow` and
`--overlay-shadow` become `--shadow-field` and `--shadow-overlay`, and `--field-border` is now a
colour with its width on `--field-border-width`.

Component markup gains the reference's slot vocabulary: `checkbox__content`, `radio__content`,
and `slider__fill` (previously `slider__filler`).
