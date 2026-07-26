import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getDesignSystemFn, saveDesignSystemFn } from "../server/design-system-functions.ts";
import { EditorShell } from "../studio/editor-shell.tsx";
import { Button, Eyebrow, Logo } from "../ui/index.ts";

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
        <Button nativeButton={false} render={<Link to="/" />} size="lg" variant="outline">
          Back to Buttercream
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

function Gate({
  children,
  eyebrow,
  heading,
}: {
  children: ReactNode;
  eyebrow: string;
  heading: string;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <a aria-label="Homepage" className="mb-3" href="/">
        <Logo />
      </a>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="max-w-[24ch] font-display text-4xl tracking-tight text-balance text-fg sm:text-5xl">
        {heading}
      </h1>
      {children}
    </main>
  );
}
