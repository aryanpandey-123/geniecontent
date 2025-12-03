import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const generatedContent = pgTable("generated_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  templateId: uuid("template_id").notNull(),
  output: text("output").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
