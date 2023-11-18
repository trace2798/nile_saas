"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
import nile from "@/lib/NileServer";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
  const { id, boardId, tenant_id } = data;
  console.log(data);
  console.log(nile.userId);
  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }
  let list;

  try {
    await nile.db("card").where({ list_id: id, tenant_id: tenant_id }).del();

    list = await nile
      .db("list")
      .where({
        id: id,
        board_id: boardId,
        tenant_id: tenant_id,
      })
      .del()
      .returning("*");
    console.log(list);

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
