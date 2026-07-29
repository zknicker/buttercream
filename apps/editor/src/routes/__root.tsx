import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DevAutoSignIn } from "../auth/dev-auto-sign-in.tsx";
import { SiteFooter } from "../marketing/site-footer.tsx";
import { SiteHeader } from "../marketing/site-header.tsx";
import { SHELL_THEME_INIT_SCRIPT } from "../shell-theme.ts";
import shellCss from "../styles/shell.css?url";
import { Button, Eyebrow } from "../ui/index.ts";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: shellCss,
        rel: "stylesheet",
      },
      {
        href: "/fonts/DepartureMono-Regular.woff2",
        rel: "preload",
        type: "font/woff2",
        as: "font",
        crossOrigin: "anonymous",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Buttercream Studio",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootComponent() {
  return <Outlet />;
}

/*
 * A wrong URL is a public surface like any other, so it keeps the bar and the footer. Stripping
 * them left the visitor on a page with one button and no way back to anything else — the only
 * headerless stops in the product are the private ones, where there is genuinely nothing to
 * navigate to yet (see `workspace/gate.tsx`).
 */
function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      {/* Vertically centred, but left-aligned on the same measure as every other page: a block
          floating in the middle of the viewport is the one layout the site never uses. */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24 lg:px-10">
        <div className="flex flex-col items-start gap-5">
          <Eyebrow>Page not found</Eyebrow>
          <h1 className="max-w-[24ch] font-display text-5xl tracking-tight text-balance text-fg sm:text-6xl">
            This one came out of the oven empty.
          </h1>
          <Button
            nativeButton={false}
            render={<Link params={{ id: "preview" }} to="/ds/$id" />}
            size="lg"
          >
            Open the preview
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <html className="antialiased" lang="en">
      <head>
        {/* Resolves the stored or system theme onto <html> before first paint. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, self-authored constant. */}
        <script dangerouslySetInnerHTML={{ __html: SHELL_THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="isolate">
        {publishableKey ? (
          <ClerkProvider publishableKey={publishableKey}>
            <DevAutoSignIn />
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
        <Scripts />
      </body>
    </html>
  );
}
