import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const designSystems = sqliteTable(
  "design_systems",
  {
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    documentJson: text("document_json").notNull(),
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id").notNull(),
    sharingEnabled: integer("sharing_enabled", { mode: "boolean" }).notNull().default(false),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    version: integer("version").notNull().default(1),
  },
  (table) => [index("design_systems_owner_updated_idx").on(table.ownerId, table.updatedAt)],
);
