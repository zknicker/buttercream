import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getDesignSystemFn, saveDesignSystemFn } from "../server/design-system-functions.ts";
import { EditorShell } from "../studio/editor-shell.tsx";

export const Route = createFileRoute("/ds/$id")({
  component: DesignSystemRoute,
  loader: ({ params }) => getDesignSystemFn({ data: params.id }),
});

function DesignSystemRoute() {
  const { id } = Route.useParams();
  const result = Route.useLoaderData();

  if (result.status === "signed-out") {
    return (
      <main className="studio-gate">
        <p className="studio-eyebrow">Private design system</p>
        <h1>Sign in to open it.</h1>
        <SignInButton>
          <button className="studio-button" type="button">
            Sign in
          </button>
        </SignInButton>
      </main>
    );
  }

  if (result.status === "not-found") {
    return (
      <main className="studio-gate">
        <p className="studio-eyebrow">Design system not found</p>
        <h1>It may belong to another account.</h1>
        <Link className="studio-button" to="/">
          Back to Buttercream
        </Link>
      </main>
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
