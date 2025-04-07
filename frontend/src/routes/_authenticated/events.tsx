import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getEventsQueryOptions } from "@/lib/api.ts";

export const Route = createFileRoute("/_authenticated/events")({
  component: Events,
});

function Events() {
  const { isLoading, error, data } = useQuery(getEventsQueryOptions);
  const events = data!.events;
  return <div className="p-2">Hello from Events!</div>;
}
