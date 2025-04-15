import { Link } from "@tanstack/react-router";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ThemeSwitcher } from "@/components/mode-toggle.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSessionQueryOptions } from "@/lib/api.ts";
import { useTranslation } from "react-i18next";

const lngs = ["en-GB", "bg-BG"];

const NavBar = () => {
  const { data } = useQuery(getSessionQueryOptions);
  const { i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  return (
    <nav className="p-4 flex justify-evenly md:justify-between sticky top-0 backdrop-blur-sm z-10 items-center gap-2">
      <Link to={"/"} className={"md:ml-2 shrink-0"}>
        <img
          src={"/planning.png"}
          alt={"App logo image"}
          className={"size-10 md:size-14"}
        />
      </Link>
      <div className={"flex justify-center items-center gap-2"}>
        <div
          className={
            "space-x-2 md:space-x-4 border bg-slate-50 dark:bg-slate-900 p-2 rounded-lg"
          }
        >
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
            <Link to={"/login"}>
              <Button>Log in</Button>
            </Link>
          )}
          <ThemeSwitcher />
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() =>
              i18n.changeLanguage(currLang === "en" ? lngs[1] : lngs[0])
            }
          >
            {currLang === "en" ? "BG" : "EN"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
