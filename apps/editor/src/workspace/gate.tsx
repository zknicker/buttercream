import type { ReactElement, ReactNode } from "react";
import { Eyebrow, Logo } from "../ui/index.ts";

/*
 * The full-page stop shown when a private surface cannot be rendered — signed out, or asking
 * for something this account does not own. Shared by the editor route and the workspace index
 * so the two read as the same product rather than two different dead ends.
 */
export function Gate({
  children,
  eyebrow,
  heading,
}: {
  children: ReactNode;
  eyebrow: string;
  heading: string;
}): ReactElement {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <a
        aria-label="Homepage"
        className="mb-3 rounded-(--radius-shell-sm) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
        href="/"
      >
        <Logo />
      </a>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-[24ch] font-display text-4xl tracking-tight text-balance text-fg sm:text-5xl">
        {heading}
      </h1>
      {children}
    </main>
  );
}
