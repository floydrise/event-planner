import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/api.ts";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    const data = await queryClient.fetchQuery(getSessionQueryOptions);
    return { user: data?.user };
  },
  component: () => {
    const { user } = Route.useRouteContext();
    if (!user) return <div>You must login</div>;
    return <Outlet />;
  },
});
