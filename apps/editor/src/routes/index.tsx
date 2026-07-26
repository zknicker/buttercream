import { Show, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createDesignSystemFn, listDesignSystemsFn } from "../server/design-system-functions.ts";

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => listDesignSystemsFn(),
});

function Home() {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  const { designSystems } = Route.useLoaderData();

  return (
    <main className="studio-home">
      <header className="studio-home__header">
        <a className="studio-wordmark" href="/">
          Buttercream
        </a>
        <nav className="studio-home__actions">
          {clerkEnabled ? (
            <>
              <Show when="signed-out">
                <SignInButton>
                  <button className="studio-button studio-button--quiet" type="button">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="studio-button" type="button">
                    Create account
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <SignedInActions />
                <UserButton />
              </Show>
            </>
          ) : null}
        </nav>
      </header>
      <section className="studio-home__hero">
        <p className="studio-eyebrow">Agent-native component systems</p>
        <h1>Shape the system. Ship the theme.</h1>
        <p>
          Composable React components, visual theme controls, and project guidance from one
          canonical design-system document.
        </p>
        <Link className="studio-button" params={{ id: "preview" }} to="/ds/$id">
          Open the preview
        </Link>
      </section>
      {clerkEnabled ? (
        <Show when="signed-in">
          <DesignSystemList designSystems={designSystems} />
        </Show>
      ) : null}
    </main>
  );
}

function SignedInActions() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const refreshed = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !refreshed.current) {
      refreshed.current = true;
      void router.invalidate();
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}

function DesignSystemList({
  designSystems,
}: {
  designSystems: Array<{ id: string; name: string; updatedAt: number }>;
}) {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const create = async () => {
    setCreating(true);
    try {
      const designSystem = await createDesignSystemFn({
        data: { name: "Untitled design system" },
      });
      await navigate({ params: { id: designSystem.id }, to: "/ds/$id" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="studio-library" aria-labelledby="your-design-systems">
      <div className="studio-library__header">
        <div>
          <p className="studio-eyebrow">Workspace</p>
          <h2 id="your-design-systems">Your design systems</h2>
        </div>
        <button
          className="studio-button"
          disabled={creating}
          onClick={() => void create()}
          type="button"
        >
          {creating ? "Creating…" : "New design system"}
        </button>
      </div>
      {designSystems.length ? (
        <div className="studio-library__grid">
          {designSystems.map((designSystem) => (
            <Link
              className="studio-library-card"
              key={designSystem.id}
              params={{ id: designSystem.id }}
              to="/ds/$id"
            >
              <strong>{designSystem.name}</strong>
              <span>Updated {formatDate(designSystem.updatedAt)}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="studio-library__empty">Create your first saved design system.</p>
      )}
    </section>
  );
}

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(timestamp);
}
