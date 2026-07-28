import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { listDesignSystemCardsFn } from "../server/design-system-functions.ts";
import { Button } from "../ui/index.ts";
import { DesignSystemsPage } from "../workspace/design-systems-page.tsx";
import { Gate } from "../workspace/gate.tsx";
import { RefreshOnSignIn } from "../workspace/refresh-on-sign-in.tsx";

/*
 * The private workspace index. Not a public surface: /ds/:id remains the only design-system
 * route a visitor can reach (invariant 6), and this page only ever renders one account's own
 * systems.
 */
export const Route = createFileRoute("/systems")({
  component: Systems,
  loader: () => listDesignSystemCardsFn(),
});

function Systems() {
  const { designSystems, status } = Route.useLoaderData();

  if (status === "signed-out") {
    return (
      <>
        {/* Clerk completes the session on the client, after this loader has already answered. */}
        <RefreshOnSignIn />
        <Gate eyebrow="Your design systems" heading="Sign in to open your workspace.">
          <SignInButton>
            <Button size="lg">Sign in</Button>
          </SignInButton>
        </Gate>
      </>
    );
  }

  return <DesignSystemsPage designSystems={designSystems} />;
}
