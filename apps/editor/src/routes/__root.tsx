import { ClerkProvider } from "@clerk/tanstack-react-start";
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DevAutoSignIn } from "../auth/dev-auto-sign-in.tsx";
import editorCss from "../styles/editor.css?url";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: editorCss,
        rel: "stylesheet",
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
    <main className="studio-home">
      <section className="studio-home__hero">
        <p className="studio-eyebrow">Page not found</p>
        <h1>Back to the studio.</h1>
        <Link className="studio-button" params={{ id: "preview" }} to="/ds/$id">
          Open the preview
        </Link>
      </section>
    </main>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
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
