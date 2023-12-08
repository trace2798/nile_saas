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
    const userInfo = await nile.db("users.users").where({
      id: nile.userId,
    });
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

    await nile.db("audit_log").insert({
      user_id: nile.userId,
      tenant_id: data.tenant_id,
      board_id: boardId,
      list_id: listId,
      user_name: userInfo[0].name,
      user_picture: userInfo[0].picture,
      message: `${userInfo[0].name} created a card called ${card[0].title} on list: ${list[0].title}`,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
