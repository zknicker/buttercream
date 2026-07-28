import { createDefaultDesignSystem, designSystemSchema } from "@buttercream/theme-core";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedProductUser, requireAuthenticatedProductUser } from "./auth.ts";
import { getDatabase } from "./database.ts";
import {
  createDesignSystem,
  deleteDesignSystem,
  duplicateDesignSystem,
  getDesignSystem,
  listDesignSystemCards,
  saveDesignSystem,
} from "./design-systems.ts";

const idSchema = z.string().trim().min(1).max(128);
const createInputSchema = z.object({
  name: z.string().trim().min(1).max(80),
});
const saveInputSchema = z.object({
  designSystem: designSystemSchema,
  id: idSchema,
  version: z.number().int().positive(),
});
const renameInputSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1).max(80),
});

export const listDesignSystemCardsFn = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getAuthenticatedProductUser();
  if (!user) {
    return { designSystems: [], status: "signed-out" as const };
  }

  return {
    designSystems: await listDesignSystemCards(getDatabase(), user.id),
    status: "signed-in" as const,
  };
});

export const getDesignSystemFn = createServerFn({ method: "GET" })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    if (id === "preview") {
      return {
        designSystem: createDefaultDesignSystem("Buttercream"),
        id,
        status: "preview" as const,
        version: null,
      };
    }

    const user = await getAuthenticatedProductUser();
    if (!user) {
      return { status: "signed-out" as const };
    }

    const record = await getDesignSystem(getDatabase(), user.id, id);
    return record ? { ...record, status: "found" as const } : { status: "not-found" as const };
  });

export const createDesignSystemFn = createServerFn({ method: "POST" })
  .validator(createInputSchema)
  .handler(async ({ data }) => {
    const user = await requireAuthenticatedProductUser();
    return await createDesignSystem(getDatabase(), user.id, data.name);
  });

export const saveDesignSystemFn = createServerFn({ method: "POST" })
  .validator(saveInputSchema)
  .handler(async ({ data }) => {
    const user = await requireAuthenticatedProductUser();
    return await saveDesignSystem(getDatabase(), {
      designSystem: data.designSystem,
      id: data.id,
      ownerId: user.id,
      version: data.version,
    });
  });

export const renameDesignSystemFn = createServerFn({ method: "POST" })
  .validator(renameInputSchema)
  .handler(async ({ data }) => {
    const user = await requireAuthenticatedProductUser();
    const database = getDatabase();

    const record = await getDesignSystem(database, user.id, data.id);
    if (!record) {
      return { status: "not-found" as const };
    }

    /*
     * Routed through saveDesignSystem rather than a name-column UPDATE so the rename takes
     * the same version guard as any other document write. The name lives in the document;
     * the column is a denormalised copy that only saveDesignSystem knows how to keep in step.
     */
    return await saveDesignSystem(database, {
      designSystem: {
        ...record.designSystem,
        identity: { ...record.designSystem.identity, name: data.name },
      },
      id: data.id,
      ownerId: user.id,
      version: record.version,
    });
  });

export const duplicateDesignSystemFn = createServerFn({ method: "POST" })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    const user = await requireAuthenticatedProductUser();
    const record = await duplicateDesignSystem(getDatabase(), user.id, id);
    return record
      ? { id: record.id, status: "duplicated" as const }
      : { status: "not-found" as const };
  });

export const deleteDesignSystemFn = createServerFn({ method: "POST" })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    const user = await requireAuthenticatedProductUser();
    const deleted = await deleteDesignSystem(getDatabase(), user.id, id);
    return { status: deleted ? ("deleted" as const) : ("not-found" as const) };
  });
