import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => ({
  requestMiddleware: [
    createCsrfMiddleware({
      filter: (context) => context.handlerType === "serverFn",
    }),
    ...(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
      ? [
          clerkMiddleware(({ url }) => ({
            authorizedParties: isLocalhost(url.hostname)
              ? [url.origin]
              : ["https://buttercream.studio"],
          })),
        ]
      : []),
  ],
}));

function isLocalhost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}
