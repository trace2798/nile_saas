"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

// import { db } from "@/lib/db";
// import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { ACTION, ENTITY_TYPE } from "@/types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const { title, boardId, listId, tenant_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  // const { title, boardId, listId, tenant_id } = data;
  let card;

  try {
    // const list = await db.list.findUnique({
    //   where: {
    //     id: listId,
    //     board: {
    //       orgId,
    //     },
    //   },
    // });
    const list = await nile
      .db("list")
      .join("board", "list.tenant_id", "=", "board.tenant_id")
      .select("list.*")
      .where({ "list.id": listId, "board.tenant_id": tenant_id });
    console.log(list);
    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await nile
      .db("card")
      .where({ list_id: listId })
      .orderBy("order", "desc")
      .select("order")
      .first();

    console.log(lastCard);
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    // card = await db.card.create({
    //   data: {
    //     title,
    //     listId,
    //     order: newOrder,
    //   },
    // });
    card = await nile
      .db("card")
      .insert({
        title: title,
        list_id: listId,
        order: newOrder,
        tenant_id: tenant_id,
      })
      .returning("*");

    // await createAuditLog({
    //   entityId: card.id,
    //   entityTitle: card.title,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE,
    // });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
