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
  console.log(lists);
  for (let list of lists) {
    list.cards = await nile
        .db("card")
        .select("*")
        .where({ list_id: list.id });
}
console.log(lists)
  const tenant = await nile
    .db("board")
    .select("*")
    .where({ id: params.boardId });
  console.log(tenant);
  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
          boardId={params.boardId}
          data={lists}
          tenant_id={tenant[0].tenant_id}
        />
      </div>
    </>
  );
};

export default BoardIdPage;
