"use client";

import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/types";
import { Separator } from "@/components/ui/separator";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white dark:bg-zinc-800 rounded-md shadow-sm"
        >
          {data.title}
          {data.status ? (
            <>
              <Separator className="bg-zinc-600 my-1" />
              <h1 className="text-xs capitalize">{data.status}</h1>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </Draggable>
  );
};
