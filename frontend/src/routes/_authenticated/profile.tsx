import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSessionQueryOptions } from "@/lib/api.ts";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery(getSessionQueryOptions);
  if (error) return <p>Error occurred: {error.message}</p>;
  return <div>{isLoading ? "Loading ..." : data?.user.name}</div>;
}
