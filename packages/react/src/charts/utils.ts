/*
 * Vendored charts reach for a `cn` helper from shadcn's lib/utils, which is clsx wrapped in
 * tailwind-merge. Buttercream carries no Tailwind classes in component source, so there is
 * nothing to merge — this is the project's own joiner under the name the vendored files expect.
 */
export { classes as cn } from "../classes.ts";
