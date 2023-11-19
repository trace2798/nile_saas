"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  console.log(nile.userId);
  const { title, id, boardId, tenant_id } = data;

  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }
  let list;

  try {
    list = await nile
      .db("list")
      .where({ id: id, board_id: boardId, tenant_id: tenant_id })
      .update({
        title: title,
      })
      .returning("*");

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // })
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
