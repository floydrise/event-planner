# 🗓️ Event planner

- - -

## ✍️ Description:

Event planner web app with authentication/authorisation, internationalisation and full type-safety done using the stack
mentioned below. Containerised using Docker and deployed to Render. Front-end build with React, bundled and then served
as static files from Hono. Both front-end and back-end live in the same repo.

### 💻 Tech used:

> [Bun](https://bun.sh/) - Runtime environment / Package manager
>
> [Hono](https://hono.dev/) - HTTP Server
>
> [Zod](https://zod.dev/) - Validation
>
> [Drizzle](https://orm.drizzle.team/) - ORM
>
> [Tanstack](https://tanstack.com/) - Router, Query and Form
>
> [Tailwind](https://tailwindcss.com/) - CSS Framework
>
> [Neon Postgres](https://neon.tech/) - Database
>
> [React](https://react.dev/) - Frontend library
>
> [Vite](https://vite.dev/) - Build tool
>
> [Docker](https://www.docker.com/) - Bundle and deploy
>
> [Better-Auth](https://www.better-auth.com/) - Auth
>
> [Render](https://render.com/) - Deployment (using Docker container)
>
> [ShadCN](https://ui.shadcn.com/) - Components
>
> [Motion](https://motion.dev/) - Landing page animations
>
> [i18next](https://react.i18next.com/) - Internationalisation

#### 🧑🏻‍💻 To run locally:

**!!! Important:** You need Bun installed

1. Navigate to a directory from terminal
2. Fork the repo and then in the terminal run `git clone https://github.com/floydrise/event-planner.git && cd event-planner`
3. `bun install && cd frontend && bun install && cd ..`
4. You'd need to set up a local postgres db, fill the .env.example file and then rename it to .env
5. `bun run dev`
6. Open a new terminal or a second tab and `cd frontend && bun run dev`
7. Both server and frontend should be running at the same time
8. Navigate to `http://localhost:5173/`, that is where the frontend runs, there is a proxy set up, all calls to backend are sent to the frontend.

#### 📦 To run with Docker:
**!!! Important:** no environment variables are set in the Dockerfile, you'd need to modify it if you want to run the project using Docker

1. cd into the main folder
2. Run ` docker build --pull -t event-planner .` (dot included at the end)
3. Run ` docker run -d -p 3000:3000 event-planner`
4. Navigate to `http://localhost:3000/`

Please consider giving the project a star ⭐️