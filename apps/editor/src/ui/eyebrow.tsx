import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactElement } from "react";
import { classes } from "./classes.ts";

type PProps = useRender.ComponentProps<"p">;

/** Small mono label above a heading. Uppercase is only legible here because it is mono. */
export function Eyebrow({ className, render, ...props }: PProps): ReactElement {
  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(
      {
        className: classes(
          "font-mono text-sm tracking-wide text-graphite uppercase sm:text-xs",
          className,
        ),
        "data-slot": "eyebrow",
      } as PProps,
      props,
    ),
    render,
  });
}
