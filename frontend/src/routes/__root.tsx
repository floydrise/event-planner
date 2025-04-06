import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import {ProfileDropdown} from "@/components/ProfileDropdown.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-end items-center gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/events" className="[&.active]:font-bold">
          Events
        </Link>
        <Link to="/create" className="[&.active]:font-bold">
          Create
        </Link>
          <ProfileDropdown/>
        <ModeToggle />
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
