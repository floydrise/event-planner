import {
  date,
  pgTable,
  serial,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const eventsTable = pgTable("events", {
  eventId: serial("event_id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  time: time().defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const eventsPostSchema = createInsertSchema(eventsTable, {
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" }),
  description: z.string().optional(),
  userId: z.string(),
  time: z.string(),
}).omit({
  eventId: true,
  createdAt: true,
});

export const eventsPatchSchema = createUpdateSchema(eventsTable, {
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" }),
  description: z.string().optional(),
  userId: z.string(),
}).omit({
  eventId: true,
  createdAt: true,
});
