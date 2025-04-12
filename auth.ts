import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./server/db";
import * as schema from "./server/db/schema/auth-schema";

export const auth = betterAuth({
  baseURL: "http://localhost:5173",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  socialProviders: {
    github: {
      clientId: Bun.env.GITHUB_CLIENT_ID!,
      clientSecret: Bun.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID!,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
