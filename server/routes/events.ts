import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eventsPostSchema, eventsTable } from "../db/schema/events";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { authMiddleware } from "../middleware";

const eventsRoute = new Hono()
  .get("/", authMiddleware, async (c) => {
    const user = c.var.user;
    const events = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.userId, user.id));
    return c.json({ events }, 200);
  })
  .get("/:id{[0-9]+}", authMiddleware, async (c) => {
    const user = c.var.user;
    const { id } = c.req.param();
    const event = await db
      .select()
      .from(eventsTable)
      .where(
        and(
          eq(eventsTable.eventId, Number(id)),
          eq(eventsTable.userId, user.id),
        ),
      )
      .then((eventReturn) => eventReturn[0]);
    if (!event) return c.json({ msg: "Not found" }, 404);
    return c.json({ event }, 200);
  })
  .post(
    "/",
    authMiddleware,
    zValidator("json", eventsPostSchema, (result, c) => {
      if (!result.success) {
        return c.json({ msg: "Bad request" }, 400);
      }
    }),
    async (c) => {
      const user = c.var.user;
      const validated = c.req.valid("json");
      const newEvent = await db
        .insert(eventsTable)
        .values(validated)
        .returning()
        .then((event) => event[0]);
      return c.json(newEvent, 201);
    },
  )
  .delete("/:id{[0-9]+}", authMiddleware, async (c) => {
    const user = c.var.user;
    const { id } = c.req.param();
    const deletedEvent = await db
      .delete(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)))
      .returning()
      .then((event) => event[0]);
    return c.json({ deletedEvent }, 200);
  });

export default eventsRoute;
