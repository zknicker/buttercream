import { createFileRoute } from "@tanstack/react-router";
import { EditorShell } from "../studio/editor-shell.tsx";

export const Route = createFileRoute("/ds/$id")({
  component: DesignSystemRoute,
});

function DesignSystemRoute() {
  const { id } = Route.useParams();
  return <EditorShell id={id} />;
}
