import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { eventsPostSchema } from "../../../../server/db/schema/events.ts";
import { api, getSessionQueryOptions } from "@/lib/api.ts";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea.tsx";
import EmojiPicker, { SkinTones, Theme } from "emoji-picker-react";
import { useState } from "react";
import { Smile } from "lucide-react";
import { useTheme } from "@/components/theme-provider.tsx";

export const Route = createFileRoute("/_authenticated/create")({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className={"text-red-500"}>
          • {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function RouteComponent() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data } = useQuery(getSessionQueryOptions);
  const user = data!.user;
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toDateString(),
      time: "09:00",
    },
    onSubmit: async ({ value }) => {
        const res = await api.events.$post({
          json: {
            ...value,
            userId: user.id,
          },
        });
        if (!res.ok) {
          toast.error("An error occurred, try again!");
        }
        queryClient.invalidateQueries({ queryKey: ["get-events"] });
        toast.success("Successfully created a new event!");
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
      <div>
        <form.Field
          name="title"
          validators={{
            onChange: eventsPostSchema.shape.title,
          }}
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name} className={"text-lg m-auto w-fit"}>
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
      </div>
      <div>
        <form.Field
          name="description"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name} className={"text-lg w-fit m-auto"}>
                  Description
                </Label>
                <div className={"relative mb-2"}>
                  <Textarea
                    rows={10}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Short description"
                  />
                  <Button
                    variant={"ghost"}
                    type={"button"}
                    className={"absolute bottom-2 right-2"}
                    size={"icon"}
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <Smile />
                  </Button>
                </div>
                <EmojiPicker
                  theme={
                    theme === "dark"
                      ? Theme.DARK
                      : theme === "light"
                        ? Theme.LIGHT
                        : Theme.AUTO
                  }
                  defaultSkinTone={SkinTones.NEUTRAL}
                  skinTonesDisabled={true}
                  open={isOpen}
                  onEmojiClick={(clicked) => {
                    const current = form.state.values.description ?? "";
                    form.setFieldValue("description", current + clicked.emoji);
                  }}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <div>
        <form.Field
          name="date"
          children={(field) => {
            return (
              <>
                <div className={"flex flex-col items-center"}>
                  <Label htmlFor={field.name} className={"text-lg"}>
                    Date
                  </Label>
                  <Calendar
                    id={field.name}
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(date) =>
                      field.handleChange(
                        (date ?? new Date()).toDateString(),
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
      </div>
      <div>
        <form.Field
          name="time"
          children={(field) => {
            return (
              <>
                <Label htmlFor={field.name} className={"m-auto w-fit text-lg"}>
                  Time
                </Label>
                <Input
                  type="time"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={"w-fit m-auto"}
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className={"w-full m-auto mb-4"}
          >
            {isSubmitting ? "Submitting" : "Add new event"}
          </Button>
        )}
      />
    </form>
  );
}
