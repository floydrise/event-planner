import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="p-4">
      <header>
        <h1
          className={
            "md:text-5xl text-3xl font-bold text-center mt-10 mb-10 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-violet-500"
          }
        >
          Welcome to Your Personal Event Planner 🎉
        </h1>
      </header>
      <section
        className={
          "flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 md:justify-evenly pb-16 border-b-4 border-t-4 pt-16 mb-10 border-dotted"
        }
      >
        <img
          src={"/event_planning.png"}
          alt={"Event planning image"}
          className={"w-96 rounded-lg"}
        />
        <div className={"flex flex-col gap-6 justify-center"}>
          <div className={"flex items-center gap-2"}>
            <BadgeCheck className={"dark:text-lime-400 text-lime-700"} />
            <p
              className={
                "font-bold whitespace-nowrap text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500"
              }
            >
              Plan smarter.
            </p>
          </div>
          <div className={"flex items-center gap-2"}>
            <BadgeCheck className={"dark:text-lime-400 text-lime-700"} />
            <p
              className={
                "font-bold whitespace-nowrap text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500"
              }
            >
              Stress less.
            </p>
          </div>
          <div className={"flex items-center gap-2"}>
            <BadgeCheck className={"dark:text-lime-400 text-lime-700"} />
            <p
              className={
                "font-bold whitespace-nowrap text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500"
              }
            >
              Celebrate more.
            </p>
          </div>
        </div>
      </section>
        <section className={
            "flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 md:justify-evenly pb-16 mb-10 border-dotted bo"
        }>
            <h2 className={"md:w-140 md:text-3xl text-2xl font-bold text-center border-dotted text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-lime-200"}>Whether it’s a birthday bash, business meeting, or weekend getaway, our Event Planner makes organizing your life simple and seamless.</h2>
            <img src={"/business_meeting.png"} alt={"Picture of a business meeting"} className={"w-96 rounded-lg"}/>
        </section>
    </main>
  );
}
