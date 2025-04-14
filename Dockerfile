# syntax=docker/dockerfile:1
FROM oven/bun:latest AS base

WORKDIR /app

ENV NODE_ENV="production"

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package.json bun.lock ./
RUN bun install --production

COPY frontend/package.json frontend/bun.lock ./frontend/
RUN cd ./frontend && bun install --production

COPY . .

WORKDIR /app/frontend
RUN bun run build

RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

FROM base

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["bun", "run", "start"]
