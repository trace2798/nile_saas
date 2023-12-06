"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays, CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import { CardWithList } from "@/types";
import { format } from "date-fns";

interface DueDateProps {
  data: CardWithList;
}

export const DueDate = ({ data }: DueDateProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data[0].id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data[0].id],
      });
      toast.success(`Due Date updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (due_date: Date | undefined) => {
    if (!due_date) {
      return;
    }
    const utcDate = new Date(
      Date.UTC(due_date.getFullYear(), due_date.getMonth(), due_date.getDate())
    );
    const boardId = params.boardId as string;
    const tenant_id = data.tenant_id;
    const list_id = data.list_id;
    execute({
      id: data.id,
      boardId,
      tenant_id,
      list_id,
      due_date: utcDate.toISOString(),
    });
  };

  return (
    <div className="flex items-center gap-x-3 w-full">
      <CalendarDays className="h-5 w-5 mt-0.5 text-muted-foreground" />
      <div className="w-full flex items-center gap-x-2">
        <p className="font-semibold text-muted-foreground">Due Date</p>
        <Popover>
          <PopoverTrigger asChild>
            {/* <FormControl> */}
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !data.due_date && "text-muted-foreground"
              )}
            >
              {data.due_date ? (
                format(new Date(data.due_date), "MMM d, yyyy")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
            {/* </FormControl> */}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.due_date}
              onSelect={onSubmit}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

DueDate.Skeleton = function DueDatePropsSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full flex items-center gap-x-2">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
      </div>
    </div>
  );
};
