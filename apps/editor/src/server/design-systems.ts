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

/**
 * What one card on the design-systems index needs. Enough of the document to render a live
 * miniature — both theme blocks, icon settings, custom CSS — and nothing more: agent rules,
 * component defaults, and identity prose are unbounded text that would be dead weight per
 * card. A projection of the canonical document, computed server-side (invariant 1).
 */
export interface DesignSystemCardData {
  customCss: string;
  icons: DesignSystem["icons"];
  id: string;
  name: string;
  theme: DesignSystem["theme"];
  updatedAt: number;
  version: number;
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

export async function listDesignSystemCards(
  database: ButtercreamDatabase,
  ownerId: string,
): Promise<DesignSystemCardData[]> {
  const rows = await database
    .select({
      documentJson: designSystems.documentJson,
      id: designSystems.id,
      updatedAt: designSystems.updatedAt,
      version: designSystems.version,
    })
    .from(designSystems)
    .where(eq(designSystems.ownerId, ownerId))
    .orderBy(desc(designSystems.updatedAt));

  return rows.map((row) => {
    const designSystem = parseDesignSystem(row.documentJson);
    return {
      customCss: designSystem.rules.customCss,
      icons: designSystem.icons,
      id: row.id,
      /* From the document, not the column: the document is canonical and the two only
         diverge if a write half-failed. */
      name: designSystem.identity.name,
      theme: designSystem.theme,
      updatedAt: row.updatedAt.getTime(),
      version: row.version,
    };
  });
}

export async function duplicateDesignSystem(
  database: ButtercreamDatabase,
  ownerId: string,
  id: string,
): Promise<DesignSystemRecord | null> {
  const source = await getDesignSystem(database, ownerId, id);
  if (!source) {
    return null;
  }

  const designSystem: DesignSystem = {
    ...source.designSystem,
    identity: {
      ...source.designSystem.identity,
      name: `${source.designSystem.identity.name} copy`,
    },
  };
  const copyId = createProductId("ds");
  const now = new Date();

  await database.insert(designSystems).values({
    createdAt: now,
    documentJson: JSON.stringify(designSystem),
    id: copyId,
    name: designSystem.identity.name,
    ownerId,
    sharingEnabled: false,
    updatedAt: now,
    version: 1,
  });

  return { designSystem, id: copyId, version: 1 };
}

export async function deleteDesignSystem(
  database: ButtercreamDatabase,
  ownerId: string,
  id: string,
): Promise<boolean> {
  /*
   * No version guard. The integer version protects document writes from clobbering newer
   * content (invariant 8); a delete discards the content deliberately, so checking it would
   * only turn "delete" into "delete unless someone just typed", which is not a useful gate.
   */
  const deleted = await database
    .delete(designSystems)
    .where(and(eq(designSystems.id, id), eq(designSystems.ownerId, ownerId)))
    .returning({ id: designSystems.id });

  return deleted.length > 0;
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
