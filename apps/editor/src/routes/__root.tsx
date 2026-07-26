import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DevAutoSignIn } from "../auth/dev-auto-sign-in.tsx";
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

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="flex flex-col items-start gap-5">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="max-w-[24ch] font-display text-5xl tracking-tight text-balance text-ink sm:text-6xl">
          This one came out of the oven empty.
        </h1>
        <Button render={<Link params={{ id: "preview" }} to="/ds/$id" />} size="lg">
          Open the preview
        </Button>
      </div>
    </main>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <html className="antialiased" lang="en">
      <head>
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
