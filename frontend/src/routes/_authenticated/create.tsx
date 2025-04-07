import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { eventsPostSchema } from "../../../../server/db/schema/events.ts";
import { api, getSessionQueryOptions } from "@/lib/api.ts";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/create")({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function RouteComponent() {
  const { data } = useQuery(getSessionQueryOptions);
  const user = data!.user;
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const res = await api.events.$post({
        json: {
          ...value,
          userId: user.id,
        },
      });
      if (!res.ok) {
        toast.error("An error occurred, try again");
      }
      toast.success("Successfully added new event");
      navigate({ to: "/events" });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={
        "flex flex-col gap-4 justify-center m-auto mt-10 max-w-[340px]"
      }
    >
      <form.Field
        name="title"
        validators={{
          onChange: eventsPostSchema.shape.title,
        }}
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <Label htmlFor={field.name} className={" text-lg"}>
                Title
              </Label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Event title"
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="description"
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <Label htmlFor={field.name} className={" text-lg"}>
                Description
              </Label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Short description"
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="date"
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <div className={"flex m-auto"}>
                <Calendar
                  id={field.name}
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(date) =>
                    field.handleChange(
                      date ? date.toISOString() : new Date().toISOString,
                    )
                  }
                  className="rounded-md border shadow"
                />
              </div>
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className={"w-fit m-auto"}
          >
            {isSubmitting ? "Submitting" : "Add new event"}
          </Button>
        )}
      />
    </form>
  );
}
