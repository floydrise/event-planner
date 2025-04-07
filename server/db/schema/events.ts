import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const eventsTable = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const eventsPostSchema = createInsertSchema(eventsTable, {
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" }),
  description: z.string().optional(),
  userId: z.string(),
}).omit({
  eventId: true,
  createdAt: true,
});