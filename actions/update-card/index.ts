"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
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
  const { id, boardId, tenant_id, ...values } = data;
  console.log(values);
  if (!nile.userId || !tenant_id) {
    return {
      error: "Unauthorized",
    };
  }

  // const { id, boardId, ...values } = data;
  let card;

  try {
    card = await nile
      .db("card")
      .where({ id: id, tenant_id: tenant_id, list_id: values.list_id })
      .update({
        title: values.title,
        description: values.description,
        status: values.status,
        due_date: values.due_date,
        assign_id: values.assign_id,
        assign_name: values.assign_name,
      })
      .returning("*");
    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.UPDATE,
    // });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
