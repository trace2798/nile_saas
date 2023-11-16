"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import nile from "@/lib/NileServer";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";
// import {
//   incrementAvailableCount,
//   hasAvailableCount
// } from "@/lib/org-limit";
// import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  // const { userId, orgId } = auth();

  // if (!userId || !orgId) {
  //   return {
  //     error: "Unauthorized",
  //   };
  // }

  // const canCreate = await hasAvailableCount();
  // const isPro = await checkSubscription();

  // if (!canCreate && !isPro) {
  //   return {
  //     error: "You have reached your limit of free boards. Please upgrade to create more."
  //   }
  // }

  const { title, image, tenant_id } = data;
console.log(title, image, tenant_id)
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;

  try {
    console.log(data.title, image)
    board = await nile.db("board").insert({
      tenant_id: data.tenant_id,
      title: data.title,
      imageid: imageId,
      imagethumburl: imageThumbUrl,
      imagefullurl: imageFullUrl,
      imageusername: imageUserName,
      imagelinkhtml: imageLinkHTML,
    }).returning("*");
    console.log(board);
    // if (!isPro) {
    //  await incrementAvailableCount();
    // }

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to create.",
    };
  }

  // revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
