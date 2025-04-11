import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, getEvents } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { BadgeInfo, TrashIcon, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";

const productSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
});

export const Route = createFileRoute("/_authenticated/events")({
  validateSearch: zodValidator(productSearchSchema),
  component: Events,
});

function Events() {
  const { page } = Route.useSearch();
  console.log(page);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["get-events", page],
    queryFn: () => getEvents(String(page)),
    staleTime: 1000 * 60 * 5,
  });
  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success("Successfully deleted event!");
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error}`);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["get-events"] }),
  });
  return (
    <>
      <div className={"w-auto md:w-[1000px] space-y-2 m-auto mt-10"}>
        {isLoading ? (
          new Array(4)
            .fill(null)
            .map((_, index) => <Skeleton key={index} className={"h-10"} />)
        ) : data?.events.length === 0 ? (
          <div className={"flex justify-center items-center gap-4"}>
            <TriangleAlert className={"size-10"} />
            <p className={"font-base text-2xl"}>Nothing here yet</p>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your planned events.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className={"font-bold"}>Title</TableHead>
                <TableHead className={"font-bold"}>Description</TableHead>
                <TableHead className={"font-bold"}>Time</TableHead>
                <TableHead className={"font-bold"}>Date</TableHead>
                <TableHead className={"font-bold"}>Info</TableHead>
                <TableHead className={"font-bold"}>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.events.map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell>
                    {event.title.length > 20
                      ? event.title.slice(0, 12) + "..."
                      : event.title}
                  </TableCell>
                  <TableCell className={"scroll-auto"}>
                    {event.description === "" || event.description === null ? (
                      <p
                        className={
                          "font-light text-gray-400 dark:text-gray-600"
                        }
                      >
                        No description
                      </p>
                    ) : event.description.length > 20 ? (
                      event.description.slice(0, 12) + "..."
                    ) : (
                      event.description
                    )}
                  </TableCell>
                  <TableCell>
                    {event.time?.split(":")[0]}:{event.time?.split(":")[1]}
                  </TableCell>
                  <TableCell>
                    {`${event.date.split("-").reverse().join("/")}`}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        type={"button"}
                        className={"hover:cursor-pointer"}
                      >
                        <BadgeInfo />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className={"md:text-xl"}>
                            {event.title}
                          </DialogTitle>
                          <DialogDescription className={"md:text-lg"}>
                            {event.description === "" ||
                            event.description === null
                              ? "No description"
                              : event.description}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <p className={"font-light italic"}>
                            Scheduled for: {event.time?.split(":")[0]}:
                            {event.time?.split(":")[1]}{" "}
                            {event.date.split("-").reverse().join("/")}
                          </p>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      className={"hover:cursor-pointer"}
                      size={"icon"}
                      disabled={mutation.isPending}
                      onClick={() => {
                        mutation.mutate(event.eventId);
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {error && toast.error("An error occured: " + error.message)}
    </>
  );
}
