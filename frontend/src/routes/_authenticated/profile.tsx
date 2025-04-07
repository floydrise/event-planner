import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSessionQueryOptions, logOut } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getSessionQueryOptions);
  },
});

function RouteComponent() {
  const mutation = logOut();
  const { data, isLoading, error } = useQuery(getSessionQueryOptions);
  const user = data!.user;
  if (error) return <p>An error occurred: {error.message}</p>;
  return (
    <section
      className={"flex justify-center items-center gap-4 mt-10 w-fit m-auto"}
    >
      <div>
        {isLoading ? (
          <Skeleton className={"size-8"} />
        ) : (
          <Avatar className={"size-12 border border-black"}>
            <AvatarImage src={user.image ?? ""} alt="User avatar image" />
            <AvatarFallback>
              {user.name.split("")[0][0] + user.name.split("")[1][0]}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ) : (
        <div>
          <h1>{user.name}</h1>
          <p className={"text-gray-600 dark:text-gray-400 font-light text-sm"}>
            {user.email}
          </p>
          <p
            className={
              "text-gray-600 font-semibold dark:text-gray-400 font-light text-sm"
            }
          >
            Registered:{" "}
            {user.createdAt
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-")}
          </p>
        </div>
      )}
      <Button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Log out
      </Button>
    </section>
  );
}
