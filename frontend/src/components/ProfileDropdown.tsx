import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getSessionQueryOptions, logOut } from "@/lib/api.ts";
import { useTranslation } from "react-i18next";
import {LogOut, User} from "lucide-react";

export function ProfileDropdown() {
  const { t } = useTranslation();
  const mutation = logOut();

  const { data } = useQuery(getSessionQueryOptions);
  const user = data!.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"mx-2 focus:outline-none"}>
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt="profile pic" />
          <AvatarFallback>
            {user.name.split(" ")[0] + user.name.split(" ")[1]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"md:mt-2 mb-2"}>
        <DropdownMenuLabel className={"text-center"}>{t("profileDropdown.label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={"/profile"}><User/>{t("profileDropdown.profile.header")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            mutation.mutate();
          }}
        >
          <LogOut/>{t("profileDropdown.logout.header")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
