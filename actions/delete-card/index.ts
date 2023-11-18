"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";
import nile from "@/lib/NileServer";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);

  const { id, boardId, tenant_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  let card;

  try {
    card = await nile
      .db("card")
      .where({
        id: id,
        tenant_id: tenant_id,
      })
      .del().returning("*");

    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.DELETE,
    // });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
