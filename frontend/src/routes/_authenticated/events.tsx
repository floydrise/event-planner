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
import { createFileRoute } from "@tanstack/react-router";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import { deleteEvent, getEventsQueryOptions } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { TrashIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/events")({
  component: Events,
});

function Events() {
  const queryClient = new QueryClient();
  const { isLoading, error, data } = useQuery(getEventsQueryOptions);
  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(getEventsQueryOptions);
      toast.success("Successfully deleted event!");
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error}`);
    },
  });
  return (
    <>
      <div className={"w-auto md:w-[1000px] space-y-2 m-auto mt-10"}>
        {data?.events.length === 0 ? (
          <p>No events yet</p>
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
                            <DialogTitle>Description</DialogTitle>
                            <DialogDescription>
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
