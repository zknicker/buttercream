import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getDesignSystemFn, saveDesignSystemFn } from "../server/design-system-functions.ts";
import { EditorShell } from "../studio/editor-shell.tsx";
import { Button } from "../ui/index.ts";
import { Gate } from "../workspace/gate.tsx";

export const Route = createFileRoute("/ds/$id")({
  component: DesignSystemRoute,
  loader: ({ params }) => getDesignSystemFn({ data: params.id }),
});

function DesignSystemRoute() {
  const { id } = Route.useParams();
  const result = Route.useLoaderData();

  if (result.status === "signed-out") {
    return (
      <Gate eyebrow="Private design system" heading="Sign in to open it.">
        <SignInButton>
          <Button size="lg">Sign in</Button>
        </SignInButton>
      </Gate>
    );
  }

  if (result.status === "not-found") {
    return (
      <Gate eyebrow="Design system not found" heading="It may belong to another account.">
        <Button nativeButton={false} render={<Link to="/systems" />} size="lg" variant="outline">
          Back to your design systems
        </Button>
      </Gate>
    );
  }

  return (
    <EditorShell
      designSystemId={id}
      initialDesignSystem={result.designSystem}
      {...(result.version === null ? {} : { initialVersion: result.version })}
      {...(result.status === "found"
        ? {
            onSave: (designSystem, version) =>
              saveDesignSystemFn({ data: { designSystem, id, version } }),
          }
        : {})}
    />
  );
}
