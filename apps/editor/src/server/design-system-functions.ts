import { createDefaultDesignSystem, designSystemSchema } from "@buttercream/theme-core";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAuthenticatedProductUser, requireAuthenticatedProductUser } from "./auth.ts";
import { getDatabase } from "./database.ts";
import {
  createDesignSystem,
  getDesignSystem,
  listDesignSystems,
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

export const listDesignSystemsFn = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getAuthenticatedProductUser();
  if (!user) {
    return { designSystems: [], status: "signed-out" as const };
  }

  return {
    designSystems: await listDesignSystems(getDatabase(), user.id),
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
