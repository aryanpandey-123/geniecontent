import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  prompt: text("prompt").notNull(),
  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
