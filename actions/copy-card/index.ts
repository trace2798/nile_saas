"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

// import { db } from "@/lib/db";
// import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { configureNile } from "@/lib/AuthUtils";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const { id, boardId, tenant_id, list_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  let card;

  try {
    const cardToCopy = await nile
      .db("card")
      .where({ id: id, tenant_id: tenant_id, list_id: list_id });

    if (!cardToCopy) {
      return { error: "Card not found" };
    }

    // const lastCard = await db.card.findFirst({
    //   where: { listId: cardToCopy[0].list_id },
    //   orderBy: { order: "desc" },
    //   select: { order: true }
    // });
    const lastCard = await nile
      .db("card")
      .where({ list_id: cardToCopy[0].list_id })
      .orderBy("order", "desc")
      .select("order")
      .first();

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    // card = await db.card.create({
    //   data: {
    //     title: `${cardToCopy.title} - Copy`,
    //     description: cardToCopy.description,
    //     order: newOrder,
    //     listId: cardToCopy.listId,
    //   },
    // });
    card = await nile
      .db("card")
      .insert({
        title: `${cardToCopy[0].title} - Copy`,
        list_id: list_id,
        order: newOrder,
        tenant_id: tenant_id,
      })
      .returning("*");

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
