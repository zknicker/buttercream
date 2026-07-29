import { createFileRoute, redirect } from "@tanstack/react-router";
import { previewSectionSlug } from "../studio/preview-section-navigation.ts";

export const Route = createFileRoute("/ds/$id/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      params: { id: params.id, section: previewSectionSlug("Brand") },
      replace: true,
      to: "/ds/$id/$section",
    });
  },
});
