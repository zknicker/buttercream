import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

type SpanProps = useRender.ComponentProps<"span">;

export type BadgeVariant = "accent" | "danger" | "ink" | "line" | "muted" | "success";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends SpanProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
}

/*
 * Height and type live here rather than in the base, because a caller cannot override them from
 * its className: Tailwind resolves competing utilities by their order in the generated stylesheet,
 * not in the class string, so a hardcoded `h-5` wins whatever the call site asks for. Mirrors the
 * published Badge's size vocabulary.
 */
const SIZES: Record<BadgeSize, string> = {
  sm: "h-3 px-1 text-[8px]",
  md: "h-5 px-1.5 text-xs",
};

const VARIANTS: Record<BadgeVariant, string> = {
  // Butter stays light in both themes, so its text is always the fixed dark ink.
  accent: "bg-butter text-ink",
  danger: "bg-berry/15 text-berry",
  /*
   * Cut from the same grey a surface outlines itself in, for a tag that sits on an edge rather
   * than inside a fill. No ring: it IS the ring, so outlining it would draw the line twice.
   */
  line: "bg-fg/10 text-muted",
  // Inverted chip: reads against the canvas it sits on, so both ends must flip.
  ink: "bg-fg text-canvas",
  muted: "bg-sunken text-muted ring-1 ring-fg/8 ring-inset",
  success: "bg-pistachio/25 text-crust",
};

export function Badge({
  className,
  render,
  size = "md",
  variant = "muted",
  ...props
}: BadgeProps): ReactElement {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: classes(
          "inline-flex items-center rounded-(--radius-shell-sm) font-mono tracking-wide uppercase",
          SIZES[size],
          VARIANTS[variant],
          className,
        ),
        "data-slot": "badge",
      } as SpanProps,
      props,
    ),
    render,
  });
}
