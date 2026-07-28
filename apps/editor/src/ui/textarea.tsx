import type { ReactElement, TextareaHTMLAttributes } from "react";
import { classes } from "./classes.ts";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Monospace, for CSS and JSON. A prop rather than a class the caller passes, because Tailwind
   * resolves competing `font-*` utilities by their order in the generated stylesheet — a
   * `font-sans` at the call site would win or lose by accident.
   */
  code?: boolean;
  fullWidth?: boolean;
}

export function Textarea({
  className,
  code = false,
  fullWidth = true,
  ...props
}: TextareaProps): ReactElement {
  return (
    <textarea
      className={classes(
        "resize-y rounded-(--radius-shell) bg-raised p-4 text-base text-fg sm:text-sm",
        code ? "font-mono" : "font-sans",
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
