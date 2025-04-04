import { Hono } from "hono";
import eventsRoute from "./routes/events";
import { logger } from "hono/logger";

const app = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/events", eventsRoute)
  .get("/", (c) => c.json({ msg: "Howdy from api 🤠" }));

export default app;
