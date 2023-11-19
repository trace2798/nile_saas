"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
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
  const { title, id, tenant_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  let board;

  try {
    // board = await db.board.update({
    //   where: {
    //     id,
    //     orgId,
    //   },
    //   data: {
    //     title,
    //   },
    // });
    board = await nile
      .db("board")
      .where({ id: id, tenant_id: tenant_id })
      .update({
        title: title,
      })
      .returning("*");

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
