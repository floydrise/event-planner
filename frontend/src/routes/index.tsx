import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
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
            "md:text-5xl text-3xl font-bold text-center pb-1 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-violet-500"
          }
        >
          {t("landing.header")}
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
              {t("landing.list.first")}
            </p>
          </div>
          <div className={"flex items-center gap-2"}>
            <BadgeCheck className={"dark:text-lime-400 text-lime-700"} />
            <p
              className={
                "font-bold whitespace-nowrap text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500"
              }
            >
              {t("landing.list.second")}
            </p>
          </div>
          <div className={"flex items-center gap-2"}>
            <BadgeCheck className={"dark:text-lime-400 text-lime-700"} />
            <p
              className={
                "font-bold whitespace-nowrap text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-500"
              }
            >
              {t("landing.list.third")}
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
          viewport={{ once: true }}
          transition={{
            duration: 2,
            scale: { type: "tween", visualDuration: 2 },
          }}
          className={
            "md:w-140 md:text-3xl text-2xl font-bold text-center border-dotted text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-lime-200"
          }
        >
          {t("landing.subheader")}
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
          "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:grid-rows-2 px-20 mt-20 gap-8 md:gap-2 md:justify-evenly pb-16 mb-10 border-dotted"
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
              {t("landing.secondList.first.header")}
            </h3>
            <p className={"font-thin w-56 "}>
              {t("landing.secondList.first.para")}
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
              {t("landing.secondList.second.header")}
            </h3>
            <p className={"font-thin w-56"}>
              {t("landing.secondList.second.para")}
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
              {t("landing.secondList.third.header")}
            </h3>
            <p className={"font-thin w-56"}>
              {t("landing.secondList.third.para")}
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
            <h3 className={"text-2xl font-semibold"}>
              {t("landing.secondList.fourth.header")}
            </h3>
            <p className={"font-thin w-56"}>
              {t("landing.secondList.fourth.para")}
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
              {t("landing.secondList.fifth.header")}
            </h3>
            <p className={"font-thin w-56"}>
              {t("landing.secondList.fifth.para")}
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
            <h3 className={"text-2xl font-semibold"}>
              {t("landing.secondList.sixth.header")}
            </h3>
            <p className={"font-thin w-56"}>
              <Link to={"/create"} className={"underline"}>
                {t("landing.secondList.sixth.link")}
              </Link>{" "}
              {t("landing.secondList.sixth.para")}
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
