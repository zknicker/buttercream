# 0007: Icon choice is project authoring configuration

`DesignSystem.icons` stores the project's icon family and treatment. Buttercream initially supports
Lucide's stroke icons and Hugeicons' available Pro treatments.

Icon choice is not a CSS theme variable. The editor uses it to render preview examples and generated
`DESIGN.md` guidance tells humans and agents which package and import pattern to use. This follows
the same model as shadcn's project-level icon-library configuration.

`@buttercream/react` remains icon-library agnostic. Components accept icon content through their
normal composition interfaces and do not depend on Lucide or Hugeicons. Component-owned structural
marks keep their lightweight defaults and expose overrides where the underlying Base UI primitive
supports them.

The Studio shell is a separate design system and does not change when the edited project's icon
settings change.
