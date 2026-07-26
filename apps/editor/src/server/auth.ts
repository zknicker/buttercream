import { auth } from "@clerk/tanstack-react-start/server";
import { getDatabase } from "./database.ts";
import { getOrCreateProductUser, type ProductUser } from "./product-users.ts";

export async function getAuthenticatedProductUser(): Promise<ProductUser | null> {
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return null;
  }

  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  return await getOrCreateProductUser(getDatabase(), userId);
}

export async function requireAuthenticatedProductUser(): Promise<ProductUser> {
  const user = await getAuthenticatedProductUser();
  if (!user) {
    throw new Error("Sign in to continue.");
  }
  return user;
}
