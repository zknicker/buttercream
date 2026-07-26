import type { ReactElement, ReactNode } from "react";
import { classes } from "./classes.ts";

/*
 * Base UI exposes Dialog and AlertDialog as separate namespaces with identical part
 * shapes, so the shared styling is published as class constants rather than wrapper
 * components — call sites keep using the namespace they actually need.
 */

export const dialogBackdropClass = classes(
  "fixed inset-0 z-20 bg-fg/35 backdrop-blur-[2px] transition-opacity duration-150",
  "data-starting-style:opacity-0 data-ending-style:opacity-0",
);

export const dialogViewportClass = "fixed inset-0 z-21 grid place-items-center p-6";

export const dialogPanelClass = classes(
  "flex max-h-[min(46rem,calc(100dvh-3rem))] flex-col gap-4 overflow-hidden rounded-xl bg-raised p-6",
  "shadow-2xl shadow-ink/25 dark:shadow-none ring-1 ring-fg/10 outline-none",
  "transition duration-150 data-starting-style:translate-y-1 data-starting-style:scale-99 data-starting-style:opacity-0",
  "data-ending-style:translate-y-1 data-ending-style:scale-99 data-ending-style:opacity-0",
);

export const dialogTitleClass = "font-display text-xl text-fg";
export const dialogDescriptionClass = "mt-1.5 text-base text-pretty text-muted sm:text-sm";

export function DialogHeader({
  children,
  close,
}: {
  children: ReactNode;
  close?: ReactNode;
}): ReactElement {
  return (
    <header className="flex items-start justify-between gap-6">
      <div className="min-w-0">{children}</div>
      {close}
    </header>
  );
}

export function DialogFooter({ children }: { children: ReactNode }): ReactElement {
  return <footer className="flex items-center justify-end gap-2.5">{children}</footer>;
}
