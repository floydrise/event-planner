import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          landing: {
            header: "Welcome to your personal scheduler",
            list: {
              first: "Plan smarter.",
              second: "Stress less.",
              third: "Celebrate more.",
            },
            subheader:
              "Whether it’s a birthday bash, business meeting, or weekend getaway, our Event Planner makes organizing your life simple and seamless.",
          },
          secondList: {
            first: {
              header: "View all your events in one place",
              para: "Easily keep track of everything you’ve got going on with a clean, user-friendly event table.",
            },
            second: {
              header: "Create events in seconds",
              para: "Just fill out a quick form, hit submit, and voilà — your event is saved and ready to go.",
            },
            third: {
              header: "Stay organized effortlessly",
              para: "Designed for ease of use, so you can spend less time planning and more time doing.",
            },
            fourth: {
              header: "Seamless Navigation",
              para: "No reloads. No waiting. Our single-page experience makes navigating between views instant and smooth — because planning should feel effortless.",
            },
            fifth: {
              header: "Focused. Flexible. Future-ready.",
              para: "Whether you’re managing a packed calendar or just a few key dates, our app is built to grow with you. Designed for clarity, speed, and ease of use.",
            },
            sixth: {
              header: "Ready to get started?",
              link: "Create",
              para: "your first event and see how simple planning can be.",
            },
          },
        },
      },
      bg: {
        translation: {
          landing: {
            header: "Добре дошли в личнaта ви програма за планиране",
            list: {
              first: "Планирай по-умно.",
              second: "Стресирай се по-малко.",
              third: "Празнувай повече.",
            },
            subheader:
              "Независимо дали става дума за празненство за рожден ден, бизнес среща или бягство през уикенда, нашата програма за планиране прави организирането на живота ви лесно и безпроблемно.",
          },
          secondList: {
            first: {
              header: "Вижте всичките си събития на едно място",
              para: "Лесно следете всичко, което се случва с изчистена, удобна за потребителя таблица за събития.",
            },
            second: {
              header: "Създавайте събития за секунди",
              para: "Просто попълнете бърз формуляр, натиснете „Изпрати“ и готово – вашето събитие е запазено и готово за работа.",
            },
            third: {
              header: "Останете организирани без усилия",
              para: "Проектиран за лесна употреба, така че можете да прекарвате по-малко време в планиране и повече време в правене.",
            },
            fourth: {
              header: "Безпроблемна навигация",
              para: "Без презареждания. Без чакане. Нашето изживяване с една страница прави навигирането между изгледи незабавно и гладко — защото планирането трябва да се чувства лесно.",
            },
            fifth: {
              header: "Фокусиран. Гъвкав. Готов за бъдещето.",
              para: "Независимо дали управлявате пълен календар или само няколко ключови дати, нашето приложение е създадено да расте с вас. Проектирано за яснота, бързина и лекота на използване.",
            },
            sixth: {
              header: "Готови ли сте да започнете?",
              link: "Създайте",
              para: "първото си събитие и вижте колко лесно може да бъде планирането.",
            },
          },
        },
      },
    },
  });

export default i18n;
