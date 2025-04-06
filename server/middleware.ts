import { createMiddleware } from "hono/factory";
import { auth } from "../auth";

export const requireAuth = createMiddleware<{
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ msg: "Not authorised" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
