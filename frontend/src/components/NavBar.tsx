import { Link } from "@tanstack/react-router";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ThemeSwitcher } from "@/components/mode-toggle.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSessionQueryOptions } from "@/lib/api.ts";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

const lngs = ["en-GB", "bg-BG"];

const NavBar = () => {
  const { data } = useQuery(getSessionQueryOptions);
  const { i18n, t } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previous = scrollY.getPrevious();
    if (latestValue > previous! && latestValue > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: window.innerWidth >= 1024 ? "-100%" : "100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="p-4 flex justify-between lg:sticky lg:top-0 fixed bottom-0 w-full backdrop-blur-3xl rounded-t-2xl lg:rounded-none z-10 items-center gap-2"
    >
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
            "space-x-2 md:space-x-4 border backdrop-blur-2xl p-2 rounded-lg"
          }
        >
          <Link
            to="/events"
            className={`[&.active]:font-bold ${currLang === "bg" ? "text-sm" : "text-base"}`}
          >
            {t("navBar.mainMenu.events")}
          </Link>
          <Link
            to="/create"
            className={`[&.active]:font-bold ${currLang === "bg" ? "text-sm" : "text-base"}`}
          >
            {t("navBar.mainMenu.create")}
          </Link>
        </div>
        <div className={"flex gap-2"}>
          {data?.session ? (
            <ProfileDropdown />
          ) : (
            <Link to={"/login"}>
              <Button variant={"outline"}>{t("navBar.logIn")}</Button>
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
            {currLang === "en" ? "БГ" : "EN"}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
