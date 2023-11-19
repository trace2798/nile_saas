"use client";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
// import { AuditLog } from "@prisma/client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMemberModal } from "@/hooks/use-member-modal";

interface CardWithListAndTitle extends CardWithList {
  listTitle: string;
}

export const AddMemberModal = () => {
    // console.log(state)
  const id = useMemberModal((state) => state.id);
  const isOpen = useMemberModal((state) => state.isOpen);
  const onClose = useMemberModal((state) => state.onClose);

  //   const { data: cardData } = useQuery<CardWithListAndTitle>({
  //     queryKey: ["card", id],
  //     queryFn: () => fetcher(`/api/cards/${id}`),
  //   });
  console.log(id);

  // const { data: auditLogsData } = useQuery<AuditLog[]>({
  //   queryKey: ["card-logs", id],
  //   queryFn: () => fetcher(`/api/cards/${id}/logs`),
  // });
  //   console.log(cardData);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* {!cardData ? <Header.Skeleton /> : <Header data={cardData} />} */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          Modal Content
        </div>
      </DialogContent>
    </Dialog>
  );
};
