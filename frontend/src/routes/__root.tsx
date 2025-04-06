import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeSwitcher } from "@/components/mode-toggle.tsx";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { Button } from "@/components/ui/button.tsx";

const { data: session } = await authClient.getSession();
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
        {session ? (
          <ProfileDropdown />
        ) : (
          <Button
            onClick={async () =>
              await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            Log in
          </Button>
        )}
        <ThemeSwitcher />
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
