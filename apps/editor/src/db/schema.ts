import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  id: text("id").primaryKey(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

/*
 * Authentication identities, many per user. Invariant 11 keeps product records on usr_* ids;
 * this table is the only place a Clerk id appears, so two Clerk instances — production and the
 * dev stack's — can both resolve to the same Buttercream user.
 */
export const userIdentities = sqliteTable(
  "user_identities",
  {
    clerkUserId: text("clerk_user_id").primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [index("user_identities_user_id_idx").on(table.userId)],
);

export const designSystems = sqliteTable(
  "design_systems",
  {
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    documentJson: text("document_json").notNull(),
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sharingEnabled: integer("sharing_enabled", { mode: "boolean" }).notNull().default(false),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    version: integer("version").notNull().default(1),
  },
  (table) => [index("design_systems_owner_updated_idx").on(table.ownerId, table.updatedAt)],
);
