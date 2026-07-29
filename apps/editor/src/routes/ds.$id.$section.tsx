import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, getRouteApi, Link, notFound } from "@tanstack/react-router";
import { saveDesignSystemFn } from "../server/design-system-functions.ts";
import { EditorShell } from "../studio/editor-shell.tsx";
import { previewSectionFromSlug } from "../studio/preview-section-navigation.ts";
import { Button } from "../ui/index.ts";
import { Gate } from "../workspace/gate.tsx";

export const Route = createFileRoute("/ds/$id/$section")({
  component: DesignSystemSectionRoute,
  beforeLoad: ({ params }) => {
    if (!previewSectionFromSlug(params.section)) {
      throw notFound();
    }
  },
});

const designSystemRoute = getRouteApi("/ds/$id");

function DesignSystemSectionRoute() {
  const { id } = designSystemRoute.useParams();
  const result = designSystemRoute.useLoaderData();
  const { section: sectionSlug } = Route.useParams();
  const section = previewSectionFromSlug(sectionSlug);

  if (!section) {
    throw notFound();
  }

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
      section={section}
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
