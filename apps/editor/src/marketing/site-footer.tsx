import type { ReactElement } from "react";
import { DitherBand, Logo } from "../ui/index.ts";

export function SiteFooter(): ReactElement {
  return (
    <footer className="mt-24">
      <DitherBand className="text-butter" direction="up" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <a aria-label="Homepage" href="/">
          <Logo />
        </a>
        <p className="font-mono text-sm text-graphite sm:text-xs">Baked in the open. Apache-2.0.</p>
      </div>
    </footer>
  );
}
