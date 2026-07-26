import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

type DivProps = useRender.ComponentProps<"div">;

export type CardVariant = "default" | "secondary" | "transparent";

export interface CardRootProps extends DivProps {
  variant?: CardVariant;
}

const VARIANTS: Record<CardVariant, string> = {
  default: "bg-raised ring-1 ring-fg/10 ring-inset",
  secondary: "bg-sunken ring-1 ring-fg/8 ring-inset",
  transparent: "bg-transparent",
};

function CardRoot({
  className,
  render,
  variant = "default",
  ...props
}: CardRootProps): ReactElement {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: classes("rounded-(--radius-shell)", VARIANTS[variant], className),
        "data-slot": "card",
      } as DivProps,
      props,
    ),
    render,
  });
}

function part(baseClass: string, dataSlot: string) {
  return function CardPart({ className, render, ...props }: DivProps): ReactElement {
    return useRender({
      defaultTagName: "div",
      props: mergeProps<"div">(
        { className: classes(baseClass, className), "data-slot": dataSlot } as DivProps,
        props,
      ),
      render,
    });
  };
}

export const Card = Object.assign(CardRoot, {
  Action: part("shrink-0", "card-action"),
  Content: part("px-5 pb-5", "card-content"),
  Description: part("mt-1 text-base text-pretty text-muted sm:text-sm", "card-description"),
  Footer: part("flex items-center gap-3 border-t border-fg/8 px-5 py-4", "card-footer"),
  Header: part("flex items-start justify-between gap-4 p-5", "card-header"),
  Title: part("font-display text-lg text-fg", "card-title"),
});
