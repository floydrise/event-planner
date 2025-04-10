import { Hono } from "hono";
import eventsRoute from "./routes/events";
import { logger } from "hono/logger";
import { auth } from "../auth";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

const app = new Hono();
const api = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use(
    "/auth/*",
    cors({
      origin: [Bun.env.BETTER_AUTH_URL!],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .route("/events", eventsRoute);

app.use("*", logger());
app.use("/*", serveStatic({ root: "frontend/dist" }));
app.get("*", serveStatic({ path: "frontend/dist/index.html" }));

export default app;
export type AppType = typeof api;
