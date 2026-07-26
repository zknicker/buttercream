# 0004: TanStack Start on Cloudflare

The hosted editor uses TanStack Start without experimental React Server Components. Cloudflare
Workers hosts the application, D1 stores design systems, Drizzle owns the SQL schema, and Clerk owns
authentication.

Early local development intentionally uses the production D1 database. This is an explicit
early-stage shortcut. Mutating developer actions must remain scoped to records owned by the
developer's Buttercream user. Clerk is an authentication boundary; product records never use a
Clerk identifier as their owner key.

The editor shell has a fixed internal visual system built directly on Base UI and internal CSS. It
does not depend on `@buttercream/react`. Themeable component previews render in an isolated iframe
so edited tokens and custom CSS cannot restyle editor controls.
