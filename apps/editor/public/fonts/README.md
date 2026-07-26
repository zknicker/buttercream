# Studio shell fonts

The shell type stack is Recoleta (display) / Söhne (body + UI) / Departure Mono (labels,
token names, numerals). Only Departure Mono is checked in.

## Departure Mono — checked in

`DepartureMono-Regular.woff2`, SIL Open Font License 1.1 (`DepartureMono-LICENSE.txt`).
Nothing to do.

## Recoleta and Söhne — trial files, gitignored

Both are commercially licensed. Evaluation copies are installed locally and excluded by
`.gitignore`, because **neither licence permits redistribution or customer-facing use**:

- **Söhne** — Klim Test Font Licence. Clause 1b forbids commercial use, 1c forbids
  distributing the files outside your organisation. Obtained from
  [klim.co.nz/test-fonts](https://klim.co.nz/test-fonts/).
- **Recoleta** — `Recoleta-RegularDEMO.otf`, published by Latinotype as a demo "for testing
  purposes only", converted to WOFF2. Full family at
  [latinotype.com](https://www.latinotype.com/catalog/recoleta/).

These are for local design evaluation only. Buy both licences before deploying the studio
publicly, or swap the stacks for open alternatives — Fraunces covers the display role and
Geist the grotesk.

### Known trial limitations

**The Söhne test fonts carry a limited character set: `A–Z a–z 0–9 . , -` only.** Apostrophes,
colons, em dashes, slashes, parentheses, ampersands, `%`, and `+` are absent and fall back
per-glyph to the system grotesk mid-word. It is unobtrusive in most UI copy but it is why
body text occasionally mixes faces. The retail fonts have the full set.

**Recoleta demo ships Regular (400) only.** Nothing in the shell asks for a heavier display
weight today — Tailwind's preflight resets heading `font-weight` to `inherit`, so headings
render at 400 — and the 500/600 `@font-face` rules below never fire a request. They are
declared ready for the retail files.

### Expected filenames

`@font-face` rules in `../../src/styles/shell.css` point at these names. Drop replacements
here and the shell picks them up on reload.

| File | Family | Weight | Status |
| --- | --- | --- | --- |
| `Recoleta-Regular.woff2` | Recoleta | 400 | demo installed |
| `Recoleta-Medium.woff2` | Recoleta | 500 | needs retail licence |
| `Recoleta-SemiBold.woff2` | Recoleta | 600 | needs retail licence |
| `Soehne-Buch.woff2` | Söhne | 400 | trial installed |
| `Soehne-Kraftig.woff2` | Söhne | 500 | trial installed |
| `Soehne-Halbfett.woff2` | Söhne | 600 | needs retail licence |

Convert `.otf`/`.ttf` to `.woff2` with `fonttools` (`TTFont(src)`, set `flavor = "woff2"`,
save) or `woff2_compress`.
