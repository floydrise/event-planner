import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getSessionQueryOptions, logOut } from "@/lib/api.ts";

export function ProfileDropdown() {
  const mutation = logOut();

  const { data } = useQuery(getSessionQueryOptions);
  const user = data!.user;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image ?? ""} alt="profile pic" />
              <AvatarFallback>
                <img
                  src={"https://github.com/shadcn.png"}
                  alt={"Fallback user image"}
                />
              </AvatarFallback>
            </Avatar>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 md:w-[100px] lg:grid-cols-1">
              <Link to={"/profile"}>
                <ListItem title="Profile">Go to profile</ListItem>
              </Link>
              <ListItem
                title="Logout"
                onClick={() => {
                  mutation.mutate();
                }}
                className={"hover:cursor-pointer"}
              >
                <p className={"hidden md:block"}>App sign out</p>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <span
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </span>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
