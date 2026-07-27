import type { ReactElement, TextareaHTMLAttributes } from "react";
import { classes } from "./classes.ts";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
}

export function Textarea({ className, fullWidth = true, ...props }: TextareaProps): ReactElement {
  return (
    <textarea
      className={classes(
        "resize-y rounded-(--radius-shell) bg-raised p-4 font-mono text-base text-fg sm:text-sm",
        "ring-1 ring-fg/12 ring-inset placeholder:text-muted/60",
        "focus-visible:-outline-offset-1 focus-visible:outline-[1.5px] focus-visible:outline-fg",
        fullWidth && "w-full",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}
