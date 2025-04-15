import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getSessionQueryOptions } from "@/lib/api.ts";
import {useTranslation} from "react-i18next";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    const data = await queryClient.fetchQuery(getSessionQueryOptions);
    return { user: data?.user };
  },
  component: () => {
      const {t} = useTranslation()
    const { user } = Route.useRouteContext();
    if (!user)
      return (
        <section className="flex flex-col justify-center items-center min-h-screen w-full">
          <h1 className="md:text-5xl text-2xl font-bold w-fit text-center text-transparent pb-2 bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 animate-bounce">
              {t("unauthorised")}
          </h1>
          <img
            src={"/unauthorized.png"}
            alt={"Image to notify a user is not authorized to see the page"}
            className="mt-4"
            width={300}
          />
        </section>
      );
    return <Outlet />;
  },
});
