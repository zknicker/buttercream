import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

export type SurfaceVariant = "default" | "secondary" | "tertiary" | "transparent";
export type SurfaceProps = useRender.ComponentProps<"div"> & {
  variant?: SurfaceVariant;
};

const VARIANTS: Record<SurfaceVariant, string> = {
  default: "bg-parchment",
  secondary: "bg-crumb",
  tertiary: "bg-ink/5",
  transparent: "bg-transparent",
};

export function Surface({
  className,
  render,
  variant = "default",
  ...props
}: SurfaceProps): ReactElement {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: classes("rounded-(--radius-shell)", VARIANTS[variant], className),
        "data-slot": "surface",
      } as useRender.ComponentProps<"div">,
      props,
    ),
    render,
  });
}
