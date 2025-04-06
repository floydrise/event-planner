import type { AppType } from "../../../server/app.ts";
import { hc } from "hono/client";
import { authClient } from "@/lib/auth-client.ts";
import { queryOptions } from "@tanstack/react-query";

export const api = hc<AppType>("/").api;

export const getSession = async () => {
  const { data: session } = await authClient.getSession();
  return session;
};

export const getSessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: getSession,
  staleTime: 1000 * 60 * 5
});
