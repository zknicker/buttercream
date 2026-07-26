import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

const clerkSignInTokensUrl = "https://api.clerk.com/v1/sign_in_tokens";
const localhostHostPattern = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/u;

export const createDevSignInTokenFn = createServerFn({ method: "POST" }).handler(async () => {
  if (!import.meta.env.DEV) {
    throw new Error("Dev sign-in is unavailable in production.");
  }

  const host = getRequestHost().toLowerCase();
  if (!localhostHostPattern.test(host)) {
    throw new Error("Dev sign-in is available only from localhost.");
  }

  if (!(env.CLERK_SECRET_KEY && env.DEV_CLERK_SIGN_IN_USER_ID)) {
    throw new Error("Dev sign-in is not configured.");
  }

  const response = await fetch(clerkSignInTokensUrl, {
    body: JSON.stringify({
      expires_in_seconds: 60,
      user_id: env.DEV_CLERK_SIGN_IN_USER_ID,
    }),
    headers: {
      Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result: unknown = await response.json();
  if (!(response.ok && hasToken(result))) {
    throw new Error(`Clerk dev sign-in failed (${response.status}).`);
  }

  return { ticket: result.token };
});

function hasToken(value: unknown): value is { token: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "token" in value &&
    typeof value.token === "string" &&
    value.token.length > 0
  );
}
