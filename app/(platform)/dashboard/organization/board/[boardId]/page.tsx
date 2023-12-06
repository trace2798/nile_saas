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

  const memberIds = await nile
    .db("users.tenant_users")
    .where({ tenant_id: tenant[0].tenant_id })
    .select("user_id");
  console.log(memberIds);

  const userInfos = await Promise.all(
    memberIds.map(async (memberId) => {
      const userId = memberId.user_id;
      const userInfoArray = await nile
        .db("users.users")
        .where({ id: userId })
        .select("*");
      const userInfo = userInfoArray[0]; // get the user object from the array
      return {
        ...userInfo,
        roles: memberId.roles,
      };
    })
  );
  console.log(userInfos);
  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer
          boardId={params.boardId}
          data={lists}
          tenant_id={tenant[0].tenant_id}
          userInfo={userInfos}
        />
      </div>
    </>
  );
};

export default BoardIdPage;
