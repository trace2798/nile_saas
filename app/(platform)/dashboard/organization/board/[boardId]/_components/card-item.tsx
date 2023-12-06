"use client";

import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface CardItemProps {
  data: Card;
  index: number;
  userInfo: any;
}

export const CardItem = ({ data, index, userInfo }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id, userInfo)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white dark:bg-zinc-800 rounded-md shadow-sm"
        >
          {data.title}
          <Separator className="bg-zinc-600 my-1" />
          <div className="flex flex-row justify-between">
            {data.status ? (
              <>
                <h1 className="text-xs capitalize">{data.status}</h1>
              </>
            ) : (
              <></>
            )}
            {data.due_date ? (
              <>
                <h1 className="text-xs capitalize">
                  Due: {format(new Date(data.due_date), "MMM d, yyyy")}
                </h1>
              </>
            ) : (
              <></>
            )}
          </div>
          {data.assign_name ? (
            <>
              <h1 className="text-xs capitalize mt-1">
                Assigned To: {data.assign_name}
              </h1>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </Draggable>
  );
};
