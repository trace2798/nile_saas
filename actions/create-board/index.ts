"use server";

// import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import nile from "@/lib/NileServer";
import { getAvailableBoardCount } from "@/lib/board-limit";
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
  const boards = await nile
    .db("board")
    .select("id")
    .where({ tenant_id: data.tenant_id });
  // .orderBy("created_at", "desc"); // no need for where clause because we previously set Nile context
  console.log(boards.length);
  const count = boards.length;

  console.log(count);

  const { title, image, tenant_id } = data;
  console.log(title, image, tenant_id);
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
    console.log(data.title, image);
    board = await nile
      .db("board")
      .insert({
        tenant_id: data.tenant_id,
        title: data.title,
        imageid: imageId,
        imagethumburl: imageThumbUrl,
        imagefullurl: imageFullUrl,
        imageusername: imageUserName,
        imagelinkhtml: imageLinkHTML,
      })
      .returning("*");
    console.log(board);
    // if (!isPro) {
    //  await incrementAvailableCount();
    // }
    const boardCount = await nile
      .db("board_count")
      .where({
        tenant_id: data.tenant_id,
      })
      .first();

    if (boardCount) {
      // If a row exists, increment the count
      await nile
        .db("board_count")
        .where({
          tenant_id: data.tenant_id,
        })
        .update({
          count: count + 1,
        });
    } else {
      // If no row exists, create a new row with count 1
      await nile.db("board_count").insert({
        tenant_id: data.tenant_id,
        count: 1,
      });
    }

    // await createAuditLog({
    //   entityTitle: board.title,
    //   entityId: board.id,
    //   entityType: ENTITY_TYPE.BOARD,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create.",
    };
  }

  // revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
