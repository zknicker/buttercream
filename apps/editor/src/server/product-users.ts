import { eq } from "drizzle-orm";
import { users } from "../db/schema.ts";
import { createProductId } from "../design-systems/ids.ts";
import type { ButtercreamDatabase } from "./database.ts";

export interface ProductUser {
  clerkUserId: string;
  id: string;
}

export async function getOrCreateProductUser(
  database: ButtercreamDatabase,
  clerkUserId: string,
): Promise<ProductUser> {
  const existing = await findProductUser(database, clerkUserId);
  if (existing) {
    return existing;
  }

  const now = new Date();
  await database
    .insert(users)
    .values({
      clerkUserId,
      createdAt: now,
      id: createProductId("usr"),
      updatedAt: now,
    })
    .onConflictDoNothing({ target: users.clerkUserId });

  const created = await findProductUser(database, clerkUserId);
  if (!created) {
    throw new Error("Buttercream user creation failed.");
  }
  return created;
}

async function findProductUser(
  database: ButtercreamDatabase,
  clerkUserId: string,
): Promise<ProductUser | null> {
  const [user] = await database
    .select({ clerkUserId: users.clerkUserId, id: users.id })
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1);

  return user ?? null;
}
