import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteEvent, getEvents } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { BadgeInfo, TrashIcon, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { useTranslation } from "react-i18next";

const pageSchema = z.object({
  page: fallback(z.number().min(1), 1).default(1),
});

export const Route = createFileRoute("/_authenticated/events")({
  validateSearch: zodValidator(pageSchema),
  component: Events,
});

function Events() {
  const { t } = useTranslation();
  const { page } = Route.useSearch();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["get-events", page],
    queryFn: () => getEvents(String(page)),
    placeholderData: keepPreviousData,
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

  const numOfPages = data?.totalCount ? Math.ceil(data.totalCount / 5) : 1;

  const paginationRange = () => {
    const totalBlocks = 7;

    if (numOfPages <= totalBlocks) {
      return [...Array(numOfPages)].map((_, i) => i + 1);
    }

    const pages = [];
    const leftSiblingIndex = Math.max(page - 1, 2);
    const rightSiblingIndex = Math.min(page + 1, numOfPages - 1);

    pages.push(1);

    if (leftSiblingIndex > 2) {
      pages.push("left-ellipsis");
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    if (rightSiblingIndex < numOfPages - 1) {
      pages.push("right-ellipsis");
    }

    pages.push(numOfPages);
    return pages;
  };

  const tableHeads = ["title", "description", "time", "date", "info", "delete"];

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
            <p className={"font-base text-2xl"}>{t("events.emptyTable")}</p>
          </div>
        ) : (
          <Table>
            <TableCaption>{t("events.tableCaption")}</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeads.map((title, index) => (
                  <TableHead key={index} className={"font-bold"}>
                    {t(`events.tableHeader.${title}`)}
                  </TableHead>
                ))}
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
                        {t("events.description")}
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
                              ? t("events.description")
                              : event.description}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <p className={"font-light italic"}>
                            {t("events.dialog.createdAt")}:{" "}
                            {event.createdAt
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </p>
                          <p className={"font-light italic"}>
                            {`${t("events.dialog.scheduled")}: ${event.time?.split(":")[0]}:${event.time?.split(":")[1]} ${event.date.split("-").reverse().join("/")}`}
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

        {/* Pagination */}
        {numOfPages > 1 && (
          <Pagination className={"mt-10"}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  to={"/events"}
                  search={{ page: page - 1 }}
                  disabled={data?.page! === 1}
                />
              </PaginationItem>

              {paginationRange().map((item, index) => {
                if (item === "left-ellipsis" || item === "right-ellipsis") {
                  return (
                    <PaginationItem key={item + index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      to={"/events"}
                      search={{ page: Number(item) }}
                      isActive={data?.page === item}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  to={"/events"}
                  search={{ page: page + 1 }}
                  disabled={!data?.hasNext}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      {error && toast.error("An error occured: " + error.message)}
    </>
  );
}
