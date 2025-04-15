import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
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
          navBar: {
            mainMenu: {
              events: "Events",
              create: "Create",
            },
            logIn: "Log in",
          },
          profileDropdown: {
            profile: {
              header: "Profile",
              subHeader: "Go to profile",
            },
            logout: {
              header: "Logout",
              subHeader: "App sign out",
            },
          },
          themeSwitcher: {
            light: "Light",
            dark: "Dark",
            system: "System",
          },
          events: {
            tableHeader: {
              title: "Title",
              description: "Description",
              time: "Time",
              date: "Date",
              info: "Info",
              delete: "Delete"
            },
            emptyTable: "Nothing here yet",
            tableCaption: "A list of your planned events.",
            description: "No description",
            dialog: {
              createdAt: "Created at",
              scheduled: "Scheduled for"
            }
          },
          create: {
            title: {
              label: "Title",
              placeHolder: "Event title"
            },
            description: {
              label: "Description",
              placeHolder: "Short description"
            },
            date: "Date",
            time: "Time",
            button: {
              submit: "Submitting",
              new: "Add new event"
            },
            toast: {
              success: "Successfully created a new event!",
              error: "An error occurred, try again!",
            },
          }
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
          navBar: {
            mainMenu: {
              events: "Събития",
              create: "Създай",
            },
            logIn: "Влез",
          },
          profileDropdown: {
            profile: {
              header: "Профил",
              subHeader: "Към профила",
            },
            logout: {
              header: "Излез",
              subHeader: "Излез от профила",
            },
          },
          themeSwitcher: {
            light: "Светла",
            dark: "Тъмна",
            system: "Система",
          },
          events: {
            tableHeader: {
              title: "Заглавие",
              description: "Описание",
              time: "Време",
              date: "Дата",
              info: "Инфо",
              delete: "Изтрии"
            },
            emptyTable: "Няма нищо все още",
            tableCaption: "Лист с планираните ви събития",
            description: "Няма описание",
            dialog: {
              createdAt: "Създадено на",
              scheduled: "Планирано за"
            }
          },
          create: {
            title: {
              label: "Заглавие",
              placeHolder: "Заглавие на събитието"
            },
            description: {
              label: "Описание",
              placeHolder: "Кратко описание"
            },
            date: "Дата",
            time: "Час",
            button: {
              submit: "Създава",
              new: "Добави ново събитие"
            },
            toast: {
              success: "Успешно създадохте ново събитие!",
              error: "Изникна грешка, моля опитайте отново!",
            },
          }
        },
      },
    },
  });

export default i18n;
