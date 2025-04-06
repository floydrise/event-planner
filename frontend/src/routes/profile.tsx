import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client.ts";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

const { data: session } = await authClient.getSession();

function RouteComponent() {
  return (
    <div>
      {session?.user ? <p>{session?.user.name}</p> : <p>Need to login</p>}
    </div>
  );
}
