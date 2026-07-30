import { Dialog } from "@base-ui/react/dialog";
import { Show, SignInButton } from "@clerk/tanstack-react-start";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons-pro/core-stroke-rounded/Cancel01Icon";
import Menu01Icon from "@hugeicons-pro/core-stroke-rounded/Menu01Icon";
import { Link } from "@tanstack/react-router";
import type { ReactElement, ReactNode } from "react";
import { Button, classes, dialogBackdropClass, Logo } from "../ui/index.ts";
import { AccountMenu } from "./account-menu.tsx";

type ExternalLinkSpec = { href: string; label: string };
type InternalLinkSpec = { label: string; to: "/pricing" | "/systems" };
type NavLinkSpec = ExternalLinkSpec | InternalLinkSpec;

function isExternal(link: NavLinkSpec): link is ExternalLinkSpec {
  return "href" in link;
}

/*
 * There is no side rail, so this bar is the whole of the app's navigation — it has to serve a
 * visitor reading marketing and an owner moving between their systems. Rather than two headers,
 * one link list that gains the workspace entry once there is a workspace to enter.
 *
 * Everything in the centre group is a text link and everything on the right is a button. That
 * split is what keeps the hover treatments honest: a link changes colour, a button lights its
 * shape. Mixing the two — github as a ghost button beside plain nav text — was the reason two
 * items that read as siblings behaved like strangers under the cursor.
 */
const PUBLIC_LINKS: readonly NavLinkSpec[] = [
  { label: "pricing", to: "/pricing" },
  { href: "https://github.com/zknicker/buttercream", label: "github" },
];

/* Leads the bar when there is an account behind it: the workspace is the signed-in home. */
const WORKSPACE_LINK: NavLinkSpec = { label: "designs", to: "/systems" };

/*
 * One height for every surface, declared rather than inherited from whatever the tallest control
 * happens to be. The bar used to measure its own contents, so it stood at 74px signed out and
 * 76px signed in — and because Clerk resolves the session after hydration, every cold load
 * animated through both. A fixed box with centred contents cannot do that.
 */
const HEADER_HEIGHT = "h-18";

export function SiteHeader({
  actions,
  current,
}: {
  actions?: ReactNode;
  current?: string | undefined;
}): ReactElement {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  return (
    <header
      className={classes(
        "mx-auto flex w-full max-w-6xl items-center gap-4 px-6 lg:px-10",
        HEADER_HEIGHT,
      )}
    >
      <div className="flex flex-1 items-center">
        <a
          aria-label="Homepage"
          className="rounded-(--radius-shell-sm) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          href="/"
        >
          <Logo />
        </a>
      </div>

      <nav aria-label="Main" className="flex items-center gap-7 max-lg:hidden">
        {clerkEnabled ? (
          <Show when="signed-in">
            <NavLink current={current} link={WORKSPACE_LINK} />
          </Show>
        ) : null}
        {PUBLIC_LINKS.map((link) => (
          <NavLink current={current} key={link.label} link={link} />
        ))}
      </nav>

      <div className="flex flex-1 items-center justify-end gap-2">
        {/* Auth lives here rather than being passed per page, so every marketing
            surface gets the same account controls instead of only the homepage. */}
        {clerkEnabled ? (
          <>
            <Show when="signed-out">
              <SignInButton>
                <Button className="max-sm:hidden" variant="ghost">
                  Sign in
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <AccountMenu />
            </Show>
          </>
        ) : null}
        {actions}
        {/*
         * The acquisition CTA is for visitors. Once there is an account, the primary action is
         * whatever the page is for — supplied through `actions` — and a second permanent button
         * beside it would just compete with it.
         */}
        {clerkEnabled ? (
          <Show when="signed-out">
            <GetButtercream />
          </Show>
        ) : (
          <GetButtercream />
        )}
        <MobileMenu current={current} />
      </div>
    </header>
  );
}

function GetButtercream(): ReactElement {
  return (
    <Button nativeButton={false} render={<Link params={{ id: "preview" }} to="/ds/$id" />}>
      Get Buttercream
    </Button>
  );
}

function navLinkClass(active: boolean): string {
  return classes(
    "relative rounded-(--radius-shell-sm) font-mono text-sm lowercase transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg",
    active ? "text-fg" : "text-shell-muted hover:text-fg",
  );
}

function NavLink({
  current,
  link,
}: {
  current?: string | undefined;
  link: NavLinkSpec;
}): ReactElement {
  const active = current === link.label;
  /* The one mark of "you are here", so it has to survive whichever element carries the label. */
  const marker = active ? (
    <span
      aria-hidden="true"
      className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 bg-butter"
    />
  ) : null;

  if (isExternal(link)) {
    return (
      <a className={navLinkClass(active)} href={link.href} rel="noreferrer" target="_blank">
        {link.label}
        {marker}
      </a>
    );
  }

  return (
    <Link className={navLinkClass(active)} to={link.to}>
      {link.label}
      {marker}
    </Link>
  );
}

function MobileMenu({ current }: { current?: string | undefined }): ReactElement {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open menu"
        className="relative inline-flex size-8.5 shrink-0 items-center justify-center rounded-(--radius-shell) text-fg transition-colors duration-150 hover:bg-fg/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg lg:hidden"
        render={<button type="button" />}
      >
        <HugeiconsIcon aria-hidden="true" icon={Menu01Icon} size={16} strokeWidth={2} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={dialogBackdropClass} />
        <Dialog.Popup className="fixed inset-x-3 top-3 z-21 flex flex-col gap-6 rounded-(--radius-shell) bg-raised p-5 shadow-2xl shadow-ink/25 dark:shadow-none ring-1 ring-fg/10 outline-none data-ending-style:opacity-0 data-starting-style:opacity-0">
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-8.5 items-center justify-center rounded-(--radius-shell) text-shell-muted transition-colors duration-150 hover:bg-fg/8 hover:text-fg"
            >
              <HugeiconsIcon aria-hidden="true" icon={Cancel01Icon} size={16} strokeWidth={2} />
            </Dialog.Close>
          </div>
          <nav aria-label="Main" className="flex flex-col gap-1">
            {clerkEnabled ? (
              <Show when="signed-in">
                <MobileNavLink current={current} link={WORKSPACE_LINK} />
              </Show>
            ) : null}
            {PUBLIC_LINKS.map((link) => (
              <MobileNavLink current={current} key={link.label} link={link} />
            ))}
          </nav>
          {/*
           * Sign in is `max-sm:hidden` in the bar, so on a phone this menu is the only place a
           * returning visitor can find it.
           */}
          {clerkEnabled ? (
            <Show when="signed-out">
              <Dialog.Close
                nativeButton={false}
                render={
                  <SignInButton>
                    <Button className="w-full sm:hidden" size="lg" variant="outline">
                      Sign in
                    </Button>
                  </SignInButton>
                }
              />
            </Show>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function mobileNavLinkClass(active: boolean): string {
  return classes(
    "rounded-(--radius-shell) px-3 py-2.5 font-mono text-base lowercase transition-colors duration-150",
    active ? "bg-sunken text-fg" : "text-shell-muted hover:bg-fg/6 hover:text-fg",
  );
}

function MobileNavLink({
  current,
  link,
}: {
  current?: string | undefined;
  link: NavLinkSpec;
}): ReactElement {
  const active = current === link.label;

  return (
    <Dialog.Close
      nativeButton={false}
      render={
        isExternal(link) ? (
          <a
            className={mobileNavLinkClass(active)}
            href={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ) : (
          <Link className={mobileNavLinkClass(active)} to={link.to}>
            {link.label}
          </Link>
        )
      }
    />
  );
}
