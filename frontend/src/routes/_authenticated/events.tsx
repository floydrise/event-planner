import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, getEventsQueryOptions } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { FileQuestion, TrashIcon, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/events")({
  component: Events,
});

function Events() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(getEventsQueryOptions);
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
        {data?.events.length === 0 ? (
          <div className={"flex justify-center items-center gap-2"}>
            <TriangleAlert className={"size-10"} />
            <p className={"font-base"}>
              No events yet, why don't you{" "}
              <Link to={"/create"} className={"underline"}>
                add
              </Link>{" "}
              one
            </p>
            <FileQuestion />
          </div>
        ) : isLoading ? (
          new Array(4)
            .fill(null)
            .map((_, index) => <Skeleton key={index} className={"h-10"} />)
        ) : (
          <Table>
            <TableCaption>A list of your planned events.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className={"font-bold"}>Title</TableHead>
                <TableHead className={"font-bold"}>Description</TableHead>
                <TableHead className={"font-bold"}>Date</TableHead>
                <TableHead className={"font-bold"}>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.events.map((event) => (
                <TableRow key={event.eventId}>
                  <TableCell>{event.title}</TableCell>
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
                      <Dialog>
                        <DialogTrigger className={"hover:cursor-pointer"}>
                          {event.description.slice(0, 12) + "..."}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className={"md:text-xl"}>
                              Description
                            </DialogTitle>
                            <DialogDescription className={"md:text-lg"}>
                              {event.description}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      event.description
                    )}
                  </TableCell>
                  <TableCell>
                    {event.date.split("-").reverse().join("/")}
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
