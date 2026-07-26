import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

type SpanProps = useRender.ComponentProps<"span">;

export type BadgeVariant = "accent" | "ink" | "muted" | "success" | "danger";

export interface BadgeProps extends SpanProps {
  variant?: BadgeVariant;
}

const VARIANTS: Record<BadgeVariant, string> = {
  accent: "bg-butter text-ink",
  danger: "bg-berry/12 text-berry",
  ink: "bg-ink text-parchment",
  muted: "bg-crumb text-graphite ring-1 ring-ink/8 ring-inset",
  success: "bg-pistachio/25 text-crust",
};

export function Badge({
  className,
  render,
  variant = "muted",
  ...props
}: BadgeProps): ReactElement {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: classes(
          "inline-flex h-5 items-center rounded-sm px-1.5 font-mono text-xs tracking-wide uppercase",
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
