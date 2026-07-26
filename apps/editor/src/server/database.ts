import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema.ts";

export function getDatabase() {
  return drizzle(env.DB, { schema });
}

export type ButtercreamDatabase = ReturnType<typeof getDatabase>;
