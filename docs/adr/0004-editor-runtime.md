# 0004: TanStack Start on Cloudflare

The hosted editor uses TanStack Start without experimental React Server Components. Cloudflare
Workers hosts the application, D1 stores design systems, Drizzle owns the SQL schema, and Clerk owns
authentication.

Early local development intentionally uses the production D1 database. This is an explicit
early-stage shortcut. Mutating developer actions must remain scoped to records owned by the
developer's Buttercream user. Clerk is an authentication boundary; product records never use a
Clerk identifier as their owner key.

The editor shell has a fixed internal visual system built directly on Base UI and internal CSS. It
does not depend on `@buttercream/react`. Themeable component previews render inline in the editor
document, not in an iframe: `PreviewSurface` (`apps/editor/src/studio/preview-surface.tsx`) applies
the design system's tokens as inline custom properties on a preview wrapper, and confines the
user's own custom CSS to that wrapper with `@scope`. Edited tokens and custom CSS still cannot
restyle editor controls -- the containment is scoping, not process isolation.

The scope prelude names the individual surface (`[data-surface-scope="..."]`), not the
`.preview-surface` class. A class prelude matches every surface in the document, which is invisible
while one page renders one preview and wrong the moment a page renders several -- one system's
custom CSS would repaint its neighbours. The design-systems index renders one live preview per card,
so per-instance scoping is what makes many differently-themed previews on one page correct.

Most sections are themed content and the shell frames them in one surface. Brand is not: it
authors the document's prose, so it is editor chrome that mounts its own surface island around the
themed material it shows. `sectionOwnsSurface` in `preview-sections.tsx` is where a section
declares which of the two it is, and the shell wraps accordingly. A section that authors the
document also receives the draft's mutator, and only when the route supplies `onSave` -- a shared
visitor reads the same page with no affordance that would write to it.

See `apps/editor/src/studio/preview-surface.test.ts`, `preview-surface-scope.test.tsx`, and
`brand-page.test.tsx` for the tests guarding that boundary.
