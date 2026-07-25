# 0004: TanStack Start on Cloudflare

The hosted editor uses TanStack Start without experimental React Server Components. Cloudflare
Workers hosts the application, D1 stores design systems, Drizzle owns the SQL schema, and Clerk owns
authentication.

Early local development intentionally uses the production D1 database. This is an explicit
early-stage shortcut. Mutating developer actions must remain scoped to records owned by the
developer's Clerk user.

The editor shell has a fixed internal visual system. Themeable component previews render in an
isolated iframe so edited tokens and custom CSS cannot restyle editor controls.

