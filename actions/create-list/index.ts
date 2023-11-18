"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";
import nile from "@/lib/NileServer";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  const { title, boardId, tenant_id } = data;
  console.log(data);
  console.log(nile.userId);
  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  let list;

  try {
    // const board = await db.board.findUnique({
    //   where: {
    //     id: boardId,
    //     orgId,
    //   },
    // });
    const board = await nile
      .db("board")
      .select("*")
      .where({ id: boardId, tenant_id: tenant_id });
    console.log(board);
    console.log("HERE");
    if (!board) {
      return {
        error: "Board not found",
      };
    }
    console.log("BEFORE LASTLIST");
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
        title: title,
        board_id: boardId,
        tenant_id: tenant_id,
        order: newOrder,
      })
      .returning("*");

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
