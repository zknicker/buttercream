import {
  createDefaultDesignSystem,
  type DesignSystem,
  designSystemSchema,
} from "@buttercream/theme-core";
import { and, desc, eq, sql } from "drizzle-orm";
import { designSystems } from "../db/schema.ts";
import { createProductId } from "../design-systems/ids.ts";
import type { ButtercreamDatabase } from "./database.ts";

export interface DesignSystemRecord {
  designSystem: DesignSystem;
  id: string;
  version: number;
}

export interface DesignSystemSummary {
  id: string;
  name: string;
  updatedAt: number;
}

export type SaveDesignSystemResult =
  | { status: "conflict"; version: number }
  | { status: "not-found" }
  | { status: "saved"; version: number };

export async function createDesignSystem(
  database: ButtercreamDatabase,
  ownerId: string,
  name: string,
): Promise<DesignSystemRecord> {
  const designSystem = createDefaultDesignSystem(name);
  const id = createProductId("ds");
  const now = new Date();

  await database.insert(designSystems).values({
    createdAt: now,
    documentJson: JSON.stringify(designSystem),
    id,
    name,
    ownerId,
    sharingEnabled: false,
    updatedAt: now,
    version: 1,
  });

  return { designSystem, id, version: 1 };
}

export async function getDesignSystem(
  database: ButtercreamDatabase,
  ownerId: string,
  id: string,
): Promise<DesignSystemRecord | null> {
  const [row] = await database
    .select({
      documentJson: designSystems.documentJson,
      id: designSystems.id,
      version: designSystems.version,
    })
    .from(designSystems)
    .where(and(eq(designSystems.id, id), eq(designSystems.ownerId, ownerId)))
    .limit(1);

  if (!row) {
    return null;
  }

  return {
    designSystem: parseDesignSystem(row.documentJson),
    id: row.id,
    version: row.version,
  };
}

export async function listDesignSystems(
  database: ButtercreamDatabase,
  ownerId: string,
): Promise<DesignSystemSummary[]> {
  const rows = await database
    .select({
      id: designSystems.id,
      name: designSystems.name,
      updatedAt: designSystems.updatedAt,
    })
    .from(designSystems)
    .where(eq(designSystems.ownerId, ownerId))
    .orderBy(desc(designSystems.updatedAt));

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    updatedAt: row.updatedAt.getTime(),
  }));
}

export async function saveDesignSystem(
  database: ButtercreamDatabase,
  input: {
    designSystem: DesignSystem;
    id: string;
    ownerId: string;
    version: number;
  },
): Promise<SaveDesignSystemResult> {
  const now = new Date();
  const [saved] = await database
    .update(designSystems)
    .set({
      documentJson: JSON.stringify(input.designSystem),
      name: input.designSystem.identity.name,
      updatedAt: now,
      version: sql`${designSystems.version} + 1`,
    })
    .where(
      and(
        eq(designSystems.id, input.id),
        eq(designSystems.ownerId, input.ownerId),
        eq(designSystems.version, input.version),
      ),
    )
    .returning({ version: designSystems.version });

  if (saved) {
    return { status: "saved", version: saved.version };
  }

  const [current] = await database
    .select({ version: designSystems.version })
    .from(designSystems)
    .where(and(eq(designSystems.id, input.id), eq(designSystems.ownerId, input.ownerId)))
    .limit(1);

  return current ? { status: "conflict", version: current.version } : { status: "not-found" };
}

function parseDesignSystem(documentJson: string): DesignSystem {
  const result = designSystemSchema.safeParse(JSON.parse(documentJson));
  if (!result.success) {
    throw new Error("Stored design system is invalid.");
  }
  return result.data;
}
