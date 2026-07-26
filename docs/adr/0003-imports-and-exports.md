# 0003: Imports replace; exports project

CSS import recognizes Buttercream theme variables, replaces current token state, and resets omitted
variables to defaults. It does not merge design systems or infer arbitrary CSS into structured
controls.

JSON import validates and replaces the complete canonical document. `design-system.json` is
therefore the lossless backup and round-trip format.

Custom CSS is a separate authored field. CSS export combines generated imports, tokens, and custom
CSS into a complete `global.css`. `DESIGN.md` export combines identity, voice, anti-patterns, agent
rules, component defaults, and durable theme guidance. The Code view also exports the repository
association as `buttercream.json`.

The CLI accepts a hosted design-system URL and writes the selected export to stdout. It never writes
into a consuming repository.
