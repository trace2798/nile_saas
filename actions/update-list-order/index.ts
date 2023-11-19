"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const { items, boardId, tenant_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }
  let lists;

  try {
    // const transaction = items.map((list) =>
    //   db.list.update({
    //     where: {
    //       id: list.id,
    //       board: {
    //         orgId,
    //       },
    //     },
    //     data: {
    //       order: list.order,
    //     },
    //   })
    // );

    // lists = await db.$transaction(transaction);

    const transaction = items.map((list) =>
      nile
        .db("list")
        .where({
          id: list.id,
          board_id: boardId,
          tenant_id: tenant_id,
        })
        .update({ order: list.order })
        .returning("id")
    );

    lists = await Promise.all(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
