"use server";

// import { auth } from "@clerk/nextjs";

// import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import nile from "@/lib/NileServer";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { configureNile } from "@/lib/AuthUtils";
import { cookies } from "next/headers";
// import { createAuditLog } from "@/lib/create-audit-log";
// import { ACTION, ENTITY_TYPE } from "@prisma/client";
// import {
//   incrementAvailableCount,
//   hasAvailableCount
// } from "@/lib/org-limit";
// import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  configureNile(cookies().get("authData"), null);
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

  if (nile.userId) {
    try {
      try {
        const userInfo = await nile.db("users.users").where({
          id: nile.userId,
        });
        console.log(userInfo);

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

        await nile.db("audit_log").insert({
          user_id: nile.userId,
          tenant_id: data.tenant_id,
          user_name: userInfo[0].name,
          user_picture: userInfo[0].picture,
          message: `${userInfo[0].name} created a board called ${board[0].title}`,
        });
      } catch (error) {
        console.log(error);
        return {
          error: "Failed to create.",
        };
      }

      // revalidatePath(`/board/${board.id}`);
      return { data: board };
    } catch (error) {
      console.log(error);
      return {
        error: "Failed to create.",
      };
    }
  } else {
    console.log("nile.userId is undefined");
    return {
      error: "User ID is undefined. Failed to create board.",
    };
  }
};

export const createBoard = createSafeAction(CreateBoard, handler);
