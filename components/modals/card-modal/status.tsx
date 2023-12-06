"use client";

import { toast } from "sonner";
import { AlignLeft, LayoutList, Moon, Sun } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { CardWithList } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusProps {
  data: CardWithList;
}

export const Status = ({ data }: StatusProps) => {
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
      toast.success(`Card "${data[0].title}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (status: string) => {
    const boardId = params.boardId as string;
    const tenant_id = data.tenant_id;
    const list_id = data.list_id;
    execute({
      id: data.id,
      boardId,
      tenant_id,
      list_id,
      status,
    });
  };

  const statusOptions = ["to-do", "in-progress", "done", "non-applicable"];

  return (
    <div className="flex items-start gap-x-3 w-full">
      <LayoutList className="h-5 w-5 mt-0.5 text-muted-foreground" />
      <div className="w-full flex items-center gap-x-2">
        <p className="font-semibold text-muted-foreground mb-2">Status</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="capitalize">
              {data.status || "Update Status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map((status, index) => (
              <DropdownMenuItem
                key={index}
                className="capitalize"
                onClick={() => onSubmit(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

Status.Skeleton = function StatusSkeleton() {
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
