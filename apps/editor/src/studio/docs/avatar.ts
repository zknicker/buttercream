import type { ComponentDoc } from "../component-docs.tsx";

export const avatarDoc: ComponentDoc = {
  usage:
    "Avatar shows a user or agent's profile image with a graceful fallback when no image loads or none is set. Compose Avatar.Image and Avatar.Fallback as children of Avatar, and set color, shape, size, and variant (solid/soft) on the root to match context — the fallback can hold initials or an icon. For chat or presence UI, reach for AgentAvatar, which wraps Avatar with initials computed from a name and a built-in online/busy/offline status dot.",
  example:
    '<Avatar aria-label="Ada King" color="accent">\n  <Avatar.Image alt="" src={user.imageUrl} />\n  <Avatar.Fallback>AK</Avatar.Fallback>\n</Avatar>',
  api: [
    {
      component: "Avatar",
      props: [
        {
          name: "color",
          type: '"default" | "accent" | "success" | "warning" | "danger"',
          defaultValue: '"default"',
          description: "Background and foreground tint of the root and its fallback.",
        },
        {
          name: "shape",
          type: '"square" | "rounded" | "circle"',
          defaultValue: '"rounded"',
          description: "Corner treatment.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg"',
          defaultValue: '"md"',
          description: "Overall dimensions and fallback font size.",
        },
        {
          name: "variant",
          type: '"solid" | "soft"',
          defaultValue: '"solid"',
          description: "Solid uses the full color; soft uses a tinted background.",
        },
        {
          name: "...props",
          type: "Base UI Avatar.Root props",
          description: "Native span attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "Avatar.Image",
      props: [
        {
          name: "src / alt",
          type: "string",
          description: "Image source and alt text; renders only once it loads successfully.",
        },
        {
          name: "onLoadingStatusChange",
          type: '(status: "idle" | "loading" | "loaded" | "error") => void',
          description: "Fires as the image's load state changes.",
        },
        {
          name: "...props",
          type: "Base UI Avatar.Image props",
          description: "Native img attributes (crossOrigin, loading, onError, ...) pass through.",
        },
      ],
    },
    {
      component: "Avatar.Fallback",
      props: [
        {
          name: "delay",
          type: "number",
          description:
            "Milliseconds to wait before rendering, avoiding a flash while the image loads.",
        },
        {
          name: "...props",
          type: "Base UI Avatar.Fallback props",
          description: "Native span attributes and the render prop pass through.",
        },
      ],
    },
    {
      component: "AgentAvatar",
      props: [
        {
          name: "name",
          type: "string",
          description: "Required. Initials shown in the fallback are derived from this.",
        },
        {
          name: "imageUrl",
          type: "string",
          description: "Optional profile image; falls back to initials when unset or failed.",
        },
        {
          name: "status",
          type: '"offline" | "online" | "busy"',
          defaultValue: '"offline"',
          description: "Presence dot in the avatar's corner.",
        },
        {
          name: "...props",
          type: "AvatarRootProps",
          description: "color, shape, size, variant, and Base UI Avatar.Root props pass through.",
        },
      ],
    },
  ],
  classes: [
    { name: ".avatar", description: "The root element." },
    { name: ".avatar--sm / .avatar--lg", description: "Non-default sizes." },
    { name: ".avatar--square / .avatar--circle", description: "Non-default shapes." },
    {
      name: ".avatar--accent … .avatar--danger",
      description: "One modifier per non-default color, applied by the color prop.",
    },
    { name: ".avatar--soft", description: 'Avatars with variant="soft".' },
    { name: ".avatar__image", description: "The image slot." },
    { name: ".avatar__fallback", description: "The fallback slot." },
    {
      name: ".avatar__fallback--accent … .avatar__fallback--danger",
      description: "Fallback-only color modifiers for custom styling; no prop sets these yet.",
    },
    {
      name: ".avatar-group",
      description: "CSS-only wrapper that overlaps direct .avatar children with a background ring.",
    },
    { name: ".agent-avatar", description: "Wraps an AgentAvatar's Avatar and status dot." },
    { name: ".agent-avatar__status", description: "The presence dot." },
    {
      name: ".agent-avatar__status--online / .agent-avatar__status--busy",
      description: "Non-default status colors.",
    },
  ],
};
