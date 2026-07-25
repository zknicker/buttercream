# 0005: Repositories associate through buttercream.json

A consuming repository may commit:

```json
{
  "$schema": "https://buttercream.studio/schema.json",
  "designSystem": "https://buttercream.studio/ds/example",
  "css": "src/styles/global.css",
  "guidance": "DESIGN.md"
}
```

This file stores association and intended destinations, not theme state. The repository-hosted
Buttercream skill teaches agents to inspect this file, fetch exports, and use ordinary file tools
with reviewable diffs.

The skill follows the skills.sh repository format. Buttercream does not ship a custom skill
installer or require MCP in its first release.
