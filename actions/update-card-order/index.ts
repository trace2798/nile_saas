"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const { items, boardId, tenant_id } = data;
  console.log(data);
  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  let updatedCards;

  try {
    const transaction = items.map((card) =>
      nile
        .db("card")
        .where({
          id: card.id,
          list_id: card.list_id,
          tenant_id: tenant_id,
          // board_id: boardId,
        })
        .update({
          order: card.order,
        })
        .returning("*")
    );
    updatedCards = await Promise.all(transaction);
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
