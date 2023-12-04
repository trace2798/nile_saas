// import { auth } from "@clerk/nextjs";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import { CardModal } from "@/components/modals/card-modal";
import { CardModalProvider } from "@/components/providers/card-modal-provider";

// import { db } from "@/lib/db";

// import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  //   const { orgId } = auth();
  //   if (!orgId) {
  //     return {
  //       title: "Board",
  //     };
  //   }
  //   const board = await db.board.findUnique({
  //     where: {
  //       id: params.boardId,
  //       orgId
  //     }
  //   });
  //   return {
  //     title: board?.title || "Board",
  //   };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  // configureNile(cookies().get("authData"), params.boardId);

  // console.log(
  //   "showing boards for user " + nile.userId + " for tenant " + nile.tenantId
  // );
  // const resp = await nile.api.tenants.getTenant();
  // console.log(resp)
  // const tenant = await resp.json();
  // console.log(tenant);
  // const board = await nile.db("board").where({id: params.boardId}) // no need for where clause because we previously set Nile context
  // console.log(board);
  const board = await nile
    .db("board")
    .select("*")
    .where({ id: params.boardId });
  console.log(board);
  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board[0].imagefullurl})` }}
    >
      <BoardNavbar data={board} />
      {/* {board ? <CardModalProvider /> : null} */}

      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
