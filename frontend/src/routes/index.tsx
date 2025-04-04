import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3 className={"text-red-500"}>Welcome Home!</h3>
      <p className={"text-green-500"}>Heyyy</p>
    </div>
  );
}
