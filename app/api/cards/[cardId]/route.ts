// import { auth } from "@clerk/nextjs";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    // const { userId, orgId } = auth();
    configureNile(cookies().get("authData"), null);
    console.log(nile.userId);
    // const { title, boardId, listId, tenant_id } = data;

    // if (!nile.userId || !tenant_id) {
    //   return {
    //     error: "Unauthorized",
    //   };
    // }

    if (!nile.userId || !params.cardId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const card = await db.card.findUnique({
    //   where: {
    //     id: params.cardId,
    //     list: {
    //       board: {
    //         orgId,
    //       },
    //     },
    //   },
    //   include: {
    //     list: {
    //       select: {
    //         title: true,
    //       },
    //     },
    //   },
    // });
    const card = await nile
    .db("card")
    .join("list", "card.list_id", "=", "list.id")
    .join("board", "list.board_id", "=", "board.id")
    .select("card.*", {"listTitle": "list.title"})
    .where({
      "card.id": params.cardId,
    })
    .first();
    console.log(card)
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
