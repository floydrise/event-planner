import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eventsPostSchema, eventsTable } from "../db/schema/events";
import { db } from "../db";
import { eq } from "drizzle-orm";

const eventsRoute = new Hono()
  .get("/", async (c) => {
    const events = await db.select().from(eventsTable);
    return c.json({ events }, 200);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const { id } = c.req.param();
    const event = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)))
      .then((eventReturn) => eventReturn[0]);
    if (!event) return c.json({ msg: "Not found" }, 404);
    return c.json({ event }, 200);
  })
  .post(
    "/",
    zValidator("json", eventsPostSchema, (result, c) => {
      if (!result.success) {
        return c.json({ msg: "Bad request" }, 400);
      }
    }),
    async (c) => {
      const validated = c.req.valid("json");
      const newEvent = await db
        .insert(eventsTable)
        .values(validated)
        .returning()
        .then((event) => event[0]);
      return c.json(newEvent, 201);
    },
  )
  .delete("/:id{[0-9]+}", async (c) => {
    const { id } = c.req.param();
    const deletedEvent = await db
      .delete(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)))
      .returning()
      .then((event) => event[0]);
    return c.json({ deletedEvent }, 200);
  });

export default eventsRoute;
