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

export const getEvents = async (page: string) => {
  const res = await api.events.$get({ query: { page } });
  if (!res.ok) throw new Error("Error while fetching events");
  return await res.json();
};

/*export const getEventsQueryOptions = queryOptions({
  queryKey: ["get-events", page],
  queryFn: getEvents(page),
  staleTime: 1000 * 60 * 5,
});*/

export const deleteEvent = async (eventId: number) => {
  const res = await api.events[":id{[0-9]+}"].$delete({
    param: {
      id: String(eventId),
    },
  });
  if (!res.ok) throw new Error("Error during deleting occurred, try again!");
  return await res.json();
};

export const updateEvent = async ({
  eventId,
  title,
  description,
  userId,
}: {
  eventId: number;
  title: string;
  description: string;
  userId: string;
}) => {
  const res = await api.events[":id{[0-9]+}"].$patch({
    param: {
      id: String(eventId),
    },
    json: {
      title,
      description,
      userId,
    },
  });
  if (!res.ok) throw new Error("Error during deleting occurred, try again!");
  return await res.json();
};
