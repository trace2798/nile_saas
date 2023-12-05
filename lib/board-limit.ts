import { cookies } from "next/headers";
import { configureNile } from "./AuthUtils";
import nile from "./NileServer";
import { NextResponse } from "next/server";

export const getAvailableBoardCount = async ({
  tenant_id,
}: {
  tenant_id: string;
}) => {
  configureNile(cookies().get("authData"), null);
  if (!nile.userId) {
    return new NextResponse("Unauthorized");
  }

  const currentCount = await nile
    .db("boards")
    .where({
      user_id: nile.userId,
      tenant_id: tenant_id,
    })
    .count();

  return currentCount;
};
