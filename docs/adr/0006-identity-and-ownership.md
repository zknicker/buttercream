# 0006: Product identity owns persisted systems

Buttercream users have stable product IDs with the `usr_` prefix. Clerk user IDs live only in the
`user_identities` table, which maps each Clerk identity to one Buttercream user; a user may hold
several identities — one per Clerk instance — so the dev stack's Clerk instance and production's
can resolve the same person to the same `usr_`. Product data, including design-system ownership,
always references the Buttercream user ID.

The first authenticated request with an unknown identity creates a Buttercream user and its
identity row. Creation is race-safe: the identity insert is on-conflict-do-nothing, the canonical
identity is re-read, and a user row orphaned by losing that race is deleted. Nothing infers that
two identities belong to one person; linking a second identity to an existing user is a deliberate
insert into `user_identities`.

Development runs against the hosted production database (reads and writes) by default. `bun run
dev:local` deliberately opts into Miniflare's isolated local database. Vite flips the D1 binding to
remote for ordinary development; the Wrangler config itself never sets `remote`.

Local development may automatically sign in a configured development user with a short-lived Clerk
ticket. The ticket endpoint is disabled in production, accepts only localhost requests, and requires
both the development Clerk secret and an explicit development user ID.

Design-system writes include the last observed integer version. A matching write increments the
version. A stale write returns the current version. The editor then requires an explicit reload or
an overwrite retry against that observed version before autosave can continue.
