---
"@buttercream/react": minor
"@buttercream/styles": minor
---

Add nine components: `Segment`, `Separator`, `Spinner`, `ToggleButton` (with
`ToggleButton.Group`), `Field` (with `Label`, `Description` and `Error` parts),
`Fieldset`, `Form`, `Textarea`, and `NumberField`.

Two new theme tokens, `--segment` and `--segment-foreground`, colour the raised pill in a
segmented control. They are authored per theme rather than derived, because the pill has to
sit above `--default` — the track it rests on — and that is a different move on light than
on dark.

Behaviour change: a loading `Button` now renders `Spinner` instead of drawing its own ring,
so the system has one loading mark. The `.button__spinner` class is still the positioning
hook, but it no longer carries the spinner's own appearance.
