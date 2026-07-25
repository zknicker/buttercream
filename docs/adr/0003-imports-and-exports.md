# 0003: Imports replace; exports project

CSS import recognizes Buttercream theme variables, replaces current token state, and resets omitted
variables to defaults. It does not merge design systems or infer arbitrary CSS into structured
controls.

Custom CSS is a separate authored field. CSS export combines generated imports, tokens, and custom
CSS into a complete `global.css`. `DESIGN.md` export combines identity, voice, anti-patterns, agent
rules, and durable theme guidance. JSON export is the portable document backup.

The CLI accepts a hosted design-system URL and writes the selected export to stdout. It never writes
into a consuming repository.

