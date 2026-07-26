# Studio shell fonts

Young Serif for display, Geist for body and UI, Departure Mono for labels, token names,
numerals, and code. All three are checked in — a fresh clone renders correctly with no
setup step.

| File | Family | Weights | Licence |
| --- | --- | --- | --- |
| `YoungSerif-Regular.woff2` | Young Serif | 400 | SIL OFL 1.1 (`YoungSerif-LICENSE.txt`) |
| `Geist-Variable.woff2` | Geist | 100–900 variable | SIL OFL 1.1 (`Geist-LICENSE.txt`) |
| `DepartureMono-Regular.woff2` | Departure Mono | 400 | SIL OFL 1.1 (`DepartureMono-LICENSE.txt`) |

## Why every face is open licensed

This repository is public under Apache-2.0, and **commercially licensed webfonts cannot be
committed to it.** Trial fonts are explicit about this — Klim's Test Font Licence forbids
distributing the files outside your own organisation — but retail webfont licences from most
foundries carry a similar restriction. Buying a licence would not have made the files
committable.

So the constraint is not "we haven't bought the good fonts yet"; it is that any face living
in this repo has to be open licensed. Young Serif and Geist were chosen on that basis, and
they are the real design, not placeholders.

If a licensed face is ever wanted, it has to be delivered outside version control — a
private asset bucket, a build-time fetch, or a foundry-hosted CDN — and the `@font-face`
rules in `../../src/styles/shell.css` pointed at it.

## Notes

- **Geist is variable (100–900) in a single 29 KB file**, so weights cost nothing extra.
  This is the Latin subset from Google Fonts; add the other unicode-range subsets if the
  studio ever needs Cyrillic or Vietnamese.
- **Young Serif ships one weight (400).** Nothing needs more today: Tailwind's preflight
  resets heading `font-weight` to `inherit`, so headings render at 400. Wanting genuinely
  heavier display type is the one thing that would force a rethink.
- Young Serif carries a full 922-glyph Latin set, so unlike the previous trial faces there
  are no missing punctuation or ligature glyphs to work around.
