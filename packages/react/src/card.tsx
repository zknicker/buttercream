"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

type DivProps = useRender.ComponentProps<"div">;

export interface CardRootProps extends DivProps {
  variant?: "default" | "secondary" | "transparent";
}

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
        className: classes("card", variant !== "default" && `card--${variant}`, className),
        "data-slot": "card",
      } as DivProps,
      props,
    ),
    render,
  });
}

function CardHeader({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__header"
      className={className}
      dataSlot="card-header"
      render={render}
      {...props}
    />
  );
}

function CardTitle({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__title"
      className={className}
      dataSlot="card-title"
      render={render}
      {...props}
    />
  );
}

function CardDescription({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__description"
      className={className}
      dataSlot="card-description"
      render={render}
      {...props}
    />
  );
}

function CardAction({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__action"
      className={className}
      dataSlot="card-action"
      render={render}
      {...props}
    />
  );
}

function CardContent({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__content"
      className={className}
      dataSlot="card-content"
      render={render}
      {...props}
    />
  );
}

function CardFooter({ className, render, ...props }: DivProps): ReactElement {
  return (
    <CardPart
      baseClass="card__footer"
      className={className}
      dataSlot="card-footer"
      render={render}
      {...props}
    />
  );
}

interface CardPartProps extends Omit<DivProps, "className" | "render"> {
  baseClass: string;
  className: string | undefined;
  dataSlot: string;
  render: DivProps["render"] | undefined;
}

function CardPart({
  baseClass,
  className,
  dataSlot,
  render,
  ...props
}: CardPartProps): ReactElement {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: classes(baseClass, className),
        "data-slot": dataSlot,
      } as DivProps,
      props,
    ),
    render,
  });
}

export const Card = Object.assign(CardRoot, {
  Action: CardAction,
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});
