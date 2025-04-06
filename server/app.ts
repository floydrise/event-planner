import { Hono } from "hono";
import eventsRoute from "./routes/events";
import { logger } from "hono/logger";
import { auth } from "../auth";
import { cors } from "hono/cors";

const app = new Hono()
  .basePath("/api")
  .use(logger())
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use(
    "/api/auth/*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .route("/events", eventsRoute)
  .get("/", (c) => c.json({ msg: "Howdy from api 🤠" }));

export default app;
