import { Link } from "@tanstack/react-router";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { ThemeSwitcher } from "@/components/mode-toggle.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSessionQueryOptions } from "@/lib/api.ts";
import { CalendarCheck } from "lucide-react";

const NavBar = () => {
  const { data } = useQuery(getSessionQueryOptions);
  return (
    <nav className="p-4 flex justify-between sticky top-0 backdrop-blur-sm z-10  items-center gap-2">
      <Link
        to={"/"}
        className={"md:ml-2 flex justify-center items-center gap-2"}
      >
        <CalendarCheck className={"size-10 md:size-12"} />
      </Link>
      <div className={"flex justify-center items-center gap-2"}>
        <div
          className={
            "space-x-2 md:space-x-4 border bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"
          }
        >
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/events" className="[&.active]:font-bold">
            Events
          </Link>
          <Link to="/create" className="[&.active]:font-bold">
            Create
          </Link>
        </div>
        <div className={"flex gap-2"}>
          {data?.session ? (
            <ProfileDropdown />
          ) : (
            <Button
              onClick={async () =>
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/events",
                })
              }
            >
              Log in
            </Button>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
