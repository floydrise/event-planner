import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NavBar from "@/components/NavBar.tsx";
import { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
