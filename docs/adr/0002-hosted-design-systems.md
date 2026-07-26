# 0002: The hosted document is canonical

Each account-owned design system stores one versioned structured document. CSS, visual guides,
component previews, JSON backup, and `DESIGN.md` are generated projections.

Schema version 2 stores identity, light and dark theme tokens, typed component defaults, custom CSS,
and agent rules. `https://buttercream.studio/schema.json` publishes the matching JSON Schema.

New design systems require authentication and are inserted from Buttercream defaults. They are
private until sharing is enabled. The opaque `/ds/:id` route serves the owner editor or a shared
read-only view.

The server stores only the latest document. Undo and redo are in-memory browser history. IndexedDB
may retain unsaved recovery state, but saved server state wins. Writes carry an integer version. A
first edit against stale state opens a reload-or-overwrite dialog.
