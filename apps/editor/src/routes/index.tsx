import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

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
    </main>
  );
}
