import type { ReactElement } from "react";
import { DitherBand, Logo } from "../ui/index.ts";

export function SiteFooter(): ReactElement {
  return (
    <footer className="mt-24">
      <DitherBand className="text-butter" direction="up" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        {/* Same focus treatment as the bar's wordmark — one lockup, one behaviour. */}
        <a
          aria-label="Homepage"
          className="w-fit rounded-(--radius-shell-sm) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          href="/"
        >
          <Logo />
        </a>
        <p className="font-mono text-sm text-shell-muted sm:text-xs">
          Baked in the open. Apache-2.0.
        </p>
      </div>
    </footer>
  );
}
