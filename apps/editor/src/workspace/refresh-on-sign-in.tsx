import { useAuth } from "@clerk/tanstack-react-start";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/*
 * Clerk finishes signing in on the client, after the loader has already run and returned the
 * signed-out shape. One invalidation on the transition re-reads the route with the session
 * attached; the ref keeps it to one.
 */
export function RefreshOnSignIn(): null {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const refreshed = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !refreshed.current) {
      refreshed.current = true;
      void router.invalidate();
    }
  }, [isLoaded, isSignedIn, router]);

  return null;
}
