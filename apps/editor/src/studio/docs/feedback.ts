import type { ComponentDoc } from "../component-docs.tsx";

export const alertDoc: ComponentDoc = {
  usage:
    'Use Alert for a block-level status message with an optional title, description (children), leading icon, and a trailing action (e.g. a dismiss or undo Button). Pick color to signal severity — danger and warning render with role="alert" so they\'re announced immediately, while default/accent/success use role="status" so they don\'t interrupt. icon defaults to a status glyph matching color; pass a custom element (a Spinner or ProgressCircle for an in-progress state) to override it, or icon={null} to omit the leading indicator entirely.',
  example:
    '<Alert\n  color="accent"\n  title="Plan updated"\n  action={<Button size="sm" variant="secondary">Undo</Button>}\n>\n  Your workspace now includes 3 more seats.\n</Alert>',
  api: [
    {
      component: "Alert",
      props: [
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Severity role; drives the icon default and the role/foreground colours.",
        },
        {
          name: "icon",
          type: "ReactNode",
          description:
            "Leading indicator. Defaults to a status glyph matching color; pass null for none.",
        },
        {
          name: "title",
          type: "ReactNode",
          description: "Bold lead line above the description.",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Description text below the title.",
        },
        {
          name: "action",
          type: "ReactNode",
          description: "Trailing content, typically a dismiss or undo Button.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'div'>",
          description: "Native div attributes pass through; role is set automatically by color.",
        },
      ],
    },
  ],
  classes: [
    { name: ".alert", description: "The root container." },
    { name: ".alert__indicator", description: "Wrapper around the leading icon." },
    { name: ".alert__content", description: "Column wrapping the title and description." },
    { name: ".alert__title", description: "The title line." },
    { name: ".alert__description", description: "The description text." },
    {
      name: ".alert--default … .alert--danger",
      description: "One modifier per color, e.g. .alert--danger.",
    },
  ],
};

export const badgeDoc: ComponentDoc = {
  usage:
    'Use Badge for a small count or status marker hung off a corner of the thing it describes — an avatar, a button — via Badge.Anchor badge={<Badge placement="top-right">3</Badge>}. Choose variant="primary" (the default) for a solid-filled badge or variant="soft" for a muted tint, and pick color to convey default/accent/success/warning/danger semantics. Render a Badge with no children — typically size="sm" and anchored — as a plain status dot. Plain string or number children are wrapped in Badge.Label automatically; when mixing an icon with text, compose Badge.Label explicitly so the text keeps its padding while the icon sits beside it as its own flex item. For a standalone label pill, reach for Chip instead — Badge is sized and padded as an indicator that hangs off something else. It\'s purely presentational, no Base UI primitive involved, so children, size, and placement are the only behavioural knobs.',
  example:
    '<Badge.Anchor badge={<Badge color="danger" placement="top-right" size="sm" />}>\n  <Button variant="secondary">Inbox</Button>\n</Badge.Anchor>',
  api: [
    {
      component: "Badge",
      props: [
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Semantic role driving background and foreground colour.",
        },
        {
          name: "variant",
          type: '"primary" | "soft"',
          defaultValue: '"primary"',
          description: "Solid fill vs a muted tint.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Dimension and font-size step.",
        },
        {
          name: "placement",
          type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
          description: "Hangs the badge off a corner when rendered inside Badge.Anchor.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'span'>",
          description: "Native span attributes pass through, e.g. aria-label for a dot badge.",
        },
      ],
    },
    {
      component: "Badge.Label",
      props: [
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'span'>",
          description:
            "Native span attributes pass through. Wraps string children automatically; compose it explicitly alongside an icon.",
        },
      ],
    },
    {
      component: "Badge.Anchor",
      props: [
        {
          name: "badge",
          type: "ReactNode",
          description: "The badge to hang off this element's corner.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'span'>",
          description: "Native span attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".badge", description: "The root element, inline or anchored." },
    {
      name: ".badge__label",
      description: "The Badge.Label span — automatic around plain text, explicit beside an icon.",
    },
    { name: ".badge--sm / .badge--lg", description: "Non-default sizes." },
    {
      name: ".badge--default … .badge--danger",
      description: "One modifier per color, combined with the variant modifier.",
    },
    { name: ".badge--primary / .badge--soft", description: "One modifier per variant." },
    { name: ".badge-anchor", description: "The relative-positioned wrapper from Badge.Anchor." },
    {
      name: ".badge--top-right … .badge--bottom-left",
      description: "One modifier per corner placement.",
    },
  ],
};

export const chipDoc: ComponentDoc = {
  usage:
    "Use Chip for compact labels like tags, categories, or statuses. Pick color (default, accent, success, warning, danger) to convey meaning, variant (primary, soft, tertiary) to control fill weight, and size (sm, md, lg) for density. Content is passed as children and rendered inside an internal label span — mix an icon element with text to build an icon+label chip, since there's no separate icon prop.",
  example: '<Chip color="success" variant="primary">\n  {icons.add} Invited\n</Chip>',
  api: [
    {
      component: "Chip",
      props: [
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Semantic role driving foreground and (for primary/soft) background.",
        },
        {
          name: "variant",
          type: '"primary" | "soft" | "tertiary"',
          defaultValue: '"soft"',
          description: "Solid fill, muted tint, or transparent (text-only) background.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Padding and font-size step.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'span'>",
          description: "Native span attributes pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".chip", description: "The root element." },
    { name: ".chip__label", description: "Inner span wrapping the chip's children." },
    { name: ".chip--sm / .chip--lg", description: "Non-default sizes." },
    {
      name: ".chip--default … .chip--danger",
      description: "One modifier per color, combined with the variant modifier.",
    },
    {
      name: ".chip--primary / .chip--soft / .chip--tertiary",
      description: "One modifier per variant.",
    },
  ],
};

export const progressCircleDoc: ComponentDoc = {
  usage:
    "Use ProgressCircle for a compact circular indicator of task progress — pass value between min and max (defaults 0-100) for determinate progress, or pass value={null} for an indeterminate spinning ring. color maps to the semantic roles (default, accent, success, warning, danger) and size picks sm/md/lg. The ring is decorative only (no in-ring label); the root itself carries the progressbar role and value for assistive tech.",
  example: '<ProgressCircle color="accent" size="lg" value={65} />',
  api: [
    {
      component: "ProgressCircle",
      props: [
        {
          name: "value",
          type: "number | null",
          description: "Current progress; null renders an indeterminate spinning ring.",
        },
        {
          name: "min",
          type: "number",
          defaultValue: "0",
          description: "Lower bound of the range.",
        },
        {
          name: "max",
          type: "number",
          defaultValue: "100",
          description: "Upper bound of the range.",
        },
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Semantic role driving the fill-arc colour.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Ring diameter.",
        },
        {
          name: "...props",
          type: "Base UI Progress.Root props",
          description: "Native progress attributes and the render prop pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".progress-circle", description: "The root element." },
    { name: ".progress-circle__track", description: "The SVG wrapping both circles." },
    { name: ".progress-circle__track-circle", description: "The background track ring." },
    { name: ".progress-circle__fill-circle", description: "The filled progress arc." },
    { name: ".progress-circle--sm / .progress-circle--lg", description: "Non-default sizes." },
    {
      name: ".progress-circle--accent … .progress-circle--danger",
      description: "One modifier per color.",
    },
  ],
};

export const skeletonDoc: ComponentDoc = {
  usage:
    "Use Skeleton as a placeholder for content that hasn't arrived yet, sized to match the shape of what will load in via style or className. It's aria-hidden by default since the loading state should be announced by the region that owns it, not by every individual box. Nest Skeletons — wrap child placeholders in an outer Skeleton — so the outermost one sweeps the shimmer across the whole group as a single pass instead of each child running its own clock. Set animation to pulse or none to change or disable the motion (none is also what prefers-reduced-motion falls back to).",
  example: '<Skeleton style={{ height: "0.75rem", width: "12rem" }} />',
  api: [
    {
      component: "Skeleton",
      props: [
        {
          name: "animation",
          type: '"shimmer" | "pulse" | "none"',
          defaultValue: '"shimmer"',
          description: "Loading motion; none also disables the sweep on any nested skeletons.",
        },
        {
          name: "...props",
          type: "ComponentPropsWithoutRef<'div'>",
          description: "Native div attributes pass through — size it with style or className.",
        },
      ],
    },
  ],
  classes: [
    { name: ".skeleton", description: "The root element; size it with style or className." },
    { name: ".skeleton--shimmer", description: "Sweeping-sheen animation (the default)." },
    { name: ".skeleton--pulse", description: "Opacity-pulse animation." },
  ],
};
