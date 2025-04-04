import { Hono } from "hono";
import eventsRoute from "./routes/events";

const app = new Hono()
  .basePath("/api")
  .route("/events", eventsRoute)
  .get("/", (c) => c.json({ msg: "Howdy from api 🤠" }));

export default app;
