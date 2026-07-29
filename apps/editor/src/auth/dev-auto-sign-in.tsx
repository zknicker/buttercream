import { useAuth, useSignIn } from "@clerk/tanstack-react-start";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { createDevSignInTokenFn } from "../server/dev-auth.ts";

export function DevAutoSignIn() {
  const enabled =
    import.meta.env.DEV &&
    import.meta.env.VITE_DEV_CLERK_AUTO_SIGN_IN === "true" &&
    Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  return enabled ? <DevAutoSignInInner /> : null;
}

function DevAutoSignInInner() {
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();
  const router = useRouter();
  const attempted = useRef(false);

  useEffect(() => {
    if (!isAuthLoaded || attempted.current) {
      return;
    }
    attempted.current = true;

    /*
     * Dev-instance session cookies live for about a minute, so a full reload routinely reaches
     * the server with an expired cookie: routes SSR the signed-out gate while clerk-js still
     * holds a live client session and re-mints the cookie moments later. Whichever way this
     * effect resolves the session, the server's verdict is stale until loaders re-run against
     * the fresh cookie — so every path ends in an invalidate.
     */
    const resyncServerAuth = () => router.invalidate();

    if (isSignedIn) {
      void resyncServerAuth();
      return;
    }

    const signInWithTicket = async () => {
      try {
        const { ticket } = await createDevSignInTokenFn();
        const { error } = await signIn.create({ strategy: "ticket", ticket });
        if (error) {
          throw error;
        }
        if (signIn.status === "complete") {
          await signIn.finalize();
        }
        await resyncServerAuth();
      } catch (error) {
        /* A session that appeared mid-flight is the stale-cookie race, not a failure. */
        const clerkError = error as { code?: string; errors?: Array<{ code?: string }> };
        const codes = [clerkError.code, ...(clerkError.errors ?? []).map((e) => e.code)];
        if (codes.includes("session_exists")) {
          await resyncServerAuth();
          return;
        }
        console.error("[DevAutoSignIn] Automatic sign-in failed.", error);
      }
    };

    void signInWithTicket();
  }, [isAuthLoaded, isSignedIn, signIn, router]);

  return null;
}
