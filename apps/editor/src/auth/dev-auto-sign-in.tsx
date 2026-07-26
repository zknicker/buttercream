import { useAuth, useSignIn } from "@clerk/tanstack-react-start";
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
  const attempted = useRef(false);

  useEffect(() => {
    if (!isAuthLoaded || isSignedIn || attempted.current) {
      return;
    }
    attempted.current = true;

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
      } catch (error) {
        console.error("[DevAutoSignIn] Automatic sign-in failed.", error);
      }
    };

    void signInWithTicket();
  }, [isAuthLoaded, isSignedIn, signIn]);

  return null;
}
