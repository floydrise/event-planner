import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eventsPostSchema, eventsTable } from "../db/schema/events";
import { db } from "../db";
import {and, asc, count, desc, eq} from "drizzle-orm";
import { requireAuth } from "../middleware";
import { z } from "zod";

const eventsRoute = new Hono()
  .get(
    "/",
    requireAuth,
    zValidator(
      "query",
      z.object({
        page: z.coerce.number().min(1).optional(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ msg: "Bad request" }, 400);
        }
      },
    ),
    async (c) => {
      const { page } = c.req.valid("query");
      const user = c.var.user;
      const limit = 5;
      const offset = page ? (page - 1) * limit : 0;
      const events = await db
        .select()
        .from(eventsTable)
        .where(eq(eventsTable.userId, user.id))
        .orderBy(desc(eventsTable.createdAt))
        .limit(limit + 1)
        .offset(offset);
      const totalCount = await db
          .select({count: count()})
          .from(eventsTable)
          .where(eq(eventsTable.userId, user.id)).then((data) => data[0])
      const hasNext = events.length > limit;
      return c.json({ events: events.slice(0, limit), page, hasNext, totalCount: totalCount.count }, 200);
    },
  )
  .get("/:id{[0-9]+}", requireAuth, async (c) => {
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
    requireAuth,
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
  .delete("/:id{[0-9]+}", requireAuth, async (c) => {
    const { id } = c.req.param();
    const deletedEvent = await db
      .delete(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)))
      .returning()
      .then((event) => event[0]);
    return c.json({ deletedEvent }, 200);
  });

export default eventsRoute;
