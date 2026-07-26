# 0006: Product identity owns persisted systems

Buttercream users have stable product IDs with the `usr_` prefix. Clerk user IDs are unique external
authentication references stored only on the user record. Product data, including design-system
ownership, always references the Buttercream user ID.

The first authenticated request creates the Buttercream user if one does not exist. Creation is
race-safe: concurrent requests insert on conflict and then read the canonical user.

Local development may automatically sign in a configured development user with a short-lived Clerk
ticket. The ticket endpoint is disabled in production, accepts only localhost requests, and requires
both the development Clerk secret and an explicit development user ID.

Design-system writes include the last observed integer version. A matching write increments the
version. A stale write returns a conflict and requires the editor to reload the current document
before continuing.
