"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

// import { db } from "@/lib/db";
// import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
import { List } from "@/types";

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }
  configureNile(cookies().get("authData"), null);
  const { id, boardId, tenant_id } = data;
  console.log(data);
  console.log(nile.userId);
  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  // const { id, boardId } = data;
  let list: List[];

  try {
    // const listToCopy = await db.list.findUnique({
    //   where: {
    //     id,
    //     boardId,
    //     board: {
    //       orgId,
    //     },
    //   },
    //   include: {
    //     cards: true,
    //   },
    // });
    const listToCopy = await nile
      .db("list")
      .where({ id: id, board_id: boardId, tenant_id: tenant_id });
    for (let list of listToCopy) {
      list.cards = await nile
        .db("card")
        .select("*")
        .where({ list_id: list.id });
    }
    // .innerJoin("board", function () {
    //   this.on("list.board_id", "=", "board.id").andOn(
    //     "list.tenant_id",
    //     "=",
    //     "board.tenant_id"
    //   );
    // })
    // .innerJoin("cards", function () {
    //   this.on("list.id", "=", "cards.list_id").andOn(
    //     "list.tenant_id",
    //     "=",
    //     "cards.tenant_id"
    //   );
    // });
    console.log(listToCopy);
    if (!listToCopy) {
      return { error: "List not found" };
    }

    // const lastList = await db.list.findFirst({
    //   where: { boardId },
    //   orderBy: { order: "desc" },
    //   select: { order: true },
    // });
    const lastList = await nile
      .db("list")
      .select("order")
      .where({ board_id: boardId, tenant_id: tenant_id })
      .orderBy("order", "desc")
      .first();
    console.log(lastList);

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await nile
      .db("list")
      .insert({
        board_id: boardId,
        title: `${listToCopy[0].title} - Copy`,
        order: newOrder,
        tenant_id: tenant_id,
      })
      .returning("*");

    // Then, create the cards for the list
    const cards = listToCopy[0].cards.map((card: any) => ({
      title: card.title,
      description: card.description,
      order: card.order,
      list_id: list[0].id, // Use the id of the newly created list
      tenant_id: tenant_id, // Use the same tenant_id
    }));

    for (let card of cards) {
      await nile.db("card").insert(card);
    }
    // list = await db.list.create({
    //   data: {
    //     boardId: listToCopy.boardId,
    //     title: `${listToCopy.title} - Copy`,
    //     order: newOrder,
    //     cards: {
    //       createMany: {
    //         data: listToCopy.cards.map((card) => ({
    //           title: card.title,
    //           description: card.description,
    //           order: card.order,
    //         })),
    //       },
    //     },
    //   },
    //   include: {
    //     cards: true,
    //   },
    // });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
