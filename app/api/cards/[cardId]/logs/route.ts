import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    configureNile(cookies().get("authData"), null);
    console.log(nile.userId);

    if (!nile.userId || !params.cardId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await nile.db("audit_log").where({
      card_id: params.cardId,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
