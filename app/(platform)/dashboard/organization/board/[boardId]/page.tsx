import { FC } from "react";
import { ListContainer } from "./_components/list-container";
import nile from "@/lib/NileServer";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const lists = await nile
    .db("list")
    .select("*")
    .where({ board_id: params.boardId });

  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer boardId={params.boardId} data={lists} />
      </div>
    </>
  );
};

export default BoardIdPage;
