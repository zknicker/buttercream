import { eq } from "drizzle-orm";
import { userIdentities, users } from "../db/schema.ts";
import { createProductId } from "../design-systems/ids.ts";
import type { ButtercreamDatabase } from "./database.ts";

export interface ProductUser {
  clerkUserId: string;
  id: string;
}

/*
 * Identities resolve to users through user_identities, never through a column on the user row.
 * One person can hold several Clerk identities — one per Clerk instance, which is what lets the
 * dev stack and production sign the same account into the same usr_* — and linking a new
 * identity to an existing user is an insert into that table, not a schema change.
 *
 * An unrecognized identity still auto-creates a fresh user; nothing here guesses that two
 * identities belong to the same person. That link is made deliberately, by writing the
 * identity row against the existing user id.
 */
export async function getOrCreateProductUser(
  database: ButtercreamDatabase,
  clerkUserId: string,
): Promise<ProductUser> {
  const existing = await findProductUser(database, clerkUserId);
  if (existing) {
    return existing;
  }

  const now = new Date();
  const userId = createProductId("usr");
  await database.insert(users).values({ createdAt: now, id: userId, updatedAt: now });
  await database
    .insert(userIdentities)
    .values({ clerkUserId, createdAt: now, userId })
    .onConflictDoNothing({ target: userIdentities.clerkUserId });

  const created = await findProductUser(database, clerkUserId);
  if (!created) {
    throw new Error("Buttercream user creation failed.");
  }
  if (created.id !== userId) {
    /* A concurrent request linked this identity first; the user row made here is unreachable. */
    await database.delete(users).where(eq(users.id, userId));
  }
  return created;
}

async function findProductUser(
  database: ButtercreamDatabase,
  clerkUserId: string,
): Promise<ProductUser | null> {
  const [identity] = await database
    .select({ clerkUserId: userIdentities.clerkUserId, id: userIdentities.userId })
    .from(userIdentities)
    .where(eq(userIdentities.clerkUserId, clerkUserId))
    .limit(1);

  return identity ?? null;
}
