import { Dialog } from "@base-ui/react/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import Menu01Icon from "@hugeicons-pro/core-stroke-rounded/Menu01Icon";
import { Link } from "@tanstack/react-router";
import type { ReactElement, ReactNode } from "react";
import { Button, classes, dialogBackdropClass, Logo } from "../ui/index.ts";

const NAV_LINKS = [
  { label: "components", to: "/ds/$id" as const, params: { id: "preview" } },
  { label: "studio", to: "/ds/$id" as const, params: { id: "preview" } },
  { label: "pricing", to: "/pricing" as const, params: {} },
];

export function SiteHeader({
  actions,
  current,
}: {
  actions?: ReactNode;
  current?: string | undefined;
}): ReactElement {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-5 lg:px-10">
      <div className="flex flex-1 items-center">
        <a
          aria-label="Homepage"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          href="/"
        >
          <Logo />
        </a>
      </div>

      <nav aria-label="Main" className="flex items-center gap-7 max-lg:hidden">
        {NAV_LINKS.map((link) => (
          <NavLink current={current} key={link.label} {...link} />
        ))}
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button
          className="font-mono max-sm:hidden"
          render={
            <a href="https://github.com/zknicker/buttercream" rel="noreferrer" target="_blank">
              github
            </a>
          }
          variant="ghost"
        />
        {actions}
        <Button render={<Link params={{ id: "preview" }} to="/ds/$id" />}>Get Buttercream</Button>
        <MobileMenu current={current} />
      </div>
    </header>
  );
}

function NavLink({
  current,
  label,
  params,
  to,
}: {
  current?: string | undefined;
  label: string;
  params: Record<string, string>;
  to: "/ds/$id" | "/pricing";
}): ReactElement {
  const active = current === label;
  return (
    <Link
      className={classes(
        "relative font-mono text-sm lowercase",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg",
        active ? "text-fg" : "text-muted hover:text-fg",
      )}
      params={params as never}
      to={to}
    >
      {label}
      {active ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 bg-butter"
        />
      ) : null}
    </Link>
  );
}

function MobileMenu({ current }: { current?: string | undefined }): ReactElement {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open menu"
        className="relative inline-flex size-8.5 shrink-0 items-center justify-center rounded-(--radius-shell) text-fg hover:bg-fg/6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg lg:hidden"
        render={<button type="button" />}
      >
        <HugeiconsIcon aria-hidden="true" icon={Menu01Icon} size={16} strokeWidth={2} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <Dialog.Popup className="fixed inset-x-3 top-3 z-21 flex flex-col gap-6 rounded-xl bg-raised p-5 shadow-2xl shadow-ink/25 dark:shadow-none ring-1 ring-fg/10 outline-none data-ending-style:opacity-0 data-starting-style:opacity-0">
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-8.5 items-center justify-center rounded-(--radius-shell) text-muted hover:bg-fg/6"
            >
              <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
            </Dialog.Close>
          </div>
          <nav aria-label="Main" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Dialog.Close
                key={link.label}
                render={
                  <Link
                    className={classes(
                      "rounded-(--radius-shell) px-3 py-2.5 font-mono text-base lowercase",
                      current === link.label ? "bg-sunken text-fg" : "text-muted",
                    )}
                    params={link.params as never}
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                }
              />
            ))}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
