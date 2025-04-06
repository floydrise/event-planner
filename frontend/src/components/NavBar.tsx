import { Link } from "@tanstack/react-router";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { ThemeSwitcher } from "@/components/mode-toggle.tsx";

const { data: session } = await authClient.getSession();
const NavBar = () => {
  return (
    <nav className="p-4 flex justify-between items-center gap-2">
      <Link to={"/"} className={"md:ml-2"}>
        <img src={"./public/logo.png"} alt={"App logo"} className={"w-14"} />
      </Link>
      <div className={"flex justify-center items-center gap-2"}>
        <div className={"space-x-2 md:space-x-4 border p-2 rounded-lg"}>
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
          {session ? (
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
