import type { AppType } from "../../../server/app.ts";
import { hc } from "hono/client";
import { authClient } from "@/lib/auth-client.ts";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const api = hc<AppType>("/").api;

export const getSession = async () => {
  const { data: session } = await authClient.getSession();
  return session;
};

export const getSessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: getSession,
  staleTime: 1000 * 60 * 5,
});

export const logOut = () => {
  const route = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["log-out"],
    mutationFn: async () => await authClient.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      route({ to: "/" });
    },
  });
};