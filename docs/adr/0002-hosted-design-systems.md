# 0002: The hosted document is canonical

Each account-owned design system stores one versioned structured document. CSS, visual guides,
component previews, JSON backup, and `DESIGN.md` are generated projections.

Schema version 2 stores identity, light and dark theme tokens, typed component defaults, custom CSS,
and agent rules. `https://buttercream.studio/schema.json` publishes the matching JSON Schema.

New design systems require authentication and are inserted from Buttercream defaults. They are
private until sharing is enabled. The opaque `/ds/:id/:section` route serves the owner editor or a
shared read-only view and makes every preview or component page directly linkable. `/ds/:id`
redirects to the Brand section.

The server stores only the latest document. Undo and redo are in-memory browser history. IndexedDB
may retain unsaved recovery state, but saved server state wins. Writes carry an integer version. A
local draft autosaves after a short idle delay, with only one write in flight. A first edit against
stale state opens a reload-or-overwrite dialog. Overwrite retries against the latest observed
version; it never bypasses version checks.
