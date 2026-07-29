import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getDesignSystemFn } from "../server/design-system-functions.ts";

export const Route = createFileRoute("/ds/$id")({
  component: Outlet,
  loader: ({ params }) => getDesignSystemFn({ data: params.id }),
});
