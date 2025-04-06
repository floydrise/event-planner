import { createFileRoute } from "@tanstack/react-router";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div
      className={
        "flex flex-col gap-4 justify-center m-auto mt-10 max-w-[340px]"
      }
    >
      <div>
        <Label htmlFor="title" className={" text-lg"}>
          Title
        </Label>
        <Input type="text" id="title" placeholder="Event title" />
      </div>
      <div>
        <Label htmlFor="description" className={" text-lg"}>
          Description
        </Label>
        <Input type="text" id="description" placeholder="Short description" />
      </div>
      <div className={"flex m-auto"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
      <Button className={"w-fit m-auto"}>Add new event</Button>
    </div>
  );
}
