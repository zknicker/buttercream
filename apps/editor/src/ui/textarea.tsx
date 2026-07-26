import type { ReactElement, TextareaHTMLAttributes } from "react";
import { classes } from "./classes.ts";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
}

export function Textarea({ className, fullWidth = true, ...props }: TextareaProps): ReactElement {
  return (
    <textarea
      className={classes(
        "resize-y rounded-(--radius-shell) bg-parchment p-4 font-mono text-base text-ink sm:text-sm",
        "ring-1 ring-ink/12 ring-inset placeholder:text-graphite/60",
        "focus-visible:-outline-offset-1 focus-visible:outline-2 focus-visible:outline-ink",
        fullWidth && "w-full",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  );
}
