import { designSystemJsonSchema } from "@buttercream/theme-core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/schema.json")({
  server: {
    handlers: {
      GET: () =>
        Response.json(designSystemJsonSchema, {
          headers: {
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
