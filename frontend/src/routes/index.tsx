import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="p-4">
      <header
        className={
          "flex flex-col md:flex-row items-center mt-10 justify-center gap-2"
        }
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={
            "md:text-5xl text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-violet-500"
          }
        >
          Welcome to Your Personal Event Planner
        </motion.h1>
      </header>
      <section
        className={
          "flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 md:justify-evenly pb-16 border-b-4  pt-16 mb-10 border-dotted"
        }
      >
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          src={"/event_planning.png"}
          alt={"Event planning image"}
          className={"w-96 rounded-lg"}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col gap-6 justify-center"}
        >
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
        </motion.div>
      </section>
      <section
        className={
          "flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 md:justify-evenly pb-16 border-b-4 mb-10 border-dotted"
        }
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true}}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={
            "md:w-140 md:text-3xl text-2xl font-bold text-center border-dotted text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-lime-200"
          }
        >
          Whether it’s a birthday bash, business meeting, or weekend getaway,
          our Event Planner makes organizing your life simple and seamless.
        </motion.h2>
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          src={"/business_meeting.png"}
          alt={"Picture of a business meeting"}
          className={"w-96 rounded-lg"}
        />
      </section>
      <section
        className={
          "grid md:grid-cols-3 grid-cols-1 md:grid-rows-2 px-20 mt-20 gap-8 md:gap-0 md:justify-evenly pb-16 mb-10 border-dotted"
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/schedule_calendar.png"}
            alt={"Image of a calendar"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>
              View all your events in one place
            </h3>
            <p className={"font-thin w-56"}>
              Easily keep track of everything you’ve got going on with a clean,
              user-friendly event table.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/pencil.png"}
            alt={"Picture of a pencil"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>
              Create events in seconds
            </h3>
            <p className={"font-thin w-56"}>
              Just fill out a quick form, hit submit, and voilà — your event is
              saved and ready to go.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/shuttle.png"}
            alt={"Picture of a shuttle"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>
              Stay organized effortlessly
            </h3>
            <p className={"font-thin w-56"}>
              Designed for ease of use, so you can spend less time planning and
              more time doing.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/rotating-arrows.png"}
            alt={"Picture of a shuttle"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>Seamless Navigation</h3>
            <p className={"font-thin w-56"}>
              No reloads. No waiting. Our single-page experience makes
              navigating between views instant and smooth — because planning
              should feel effortless.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/target.png"}
            alt={"Picture of a shuttle"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>
              Focused. Flexible. Future-ready.
            </h3>
            <p className={"font-thin w-56"}>
              Whether you’re managing a packed calendar or just a few key dates,
              our app is built to grow with you. Designed for clarity, speed,
              and ease of use.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={"flex flex-col md:flex-row items-center gap-2"}
        >
          <img
            src={"/pointing-down.png"}
            alt={"Picture of a shuttle"}
            className={"w-12 rounded-lg"}
          />
          <div>
            <h3 className={"text-2xl font-semibold"}>Ready to get started?</h3>
            <p className={"font-thin w-56"}>
              <Link to={"/create"} className={"underline"}>
                Create
              </Link>{" "}
              your first event and see how simple planning can be.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
