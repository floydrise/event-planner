import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/events")({
  component: Events,
});

function Events() {
  return <div className="p-2">Hello from Events!</div>;
}
