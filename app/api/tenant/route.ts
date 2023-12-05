import { configureNile, cookieOptions, NileJWTPayload } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import jwtDecode from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Note that this route must exist in this exact location for user/password signup to work
// Nile's SignUp component posts to this route, we call Nile's signup API via the SDK
export async function POST(req: Request) {
  try {
    const body = await req.json();
    configureNile(cookies().get("authData"), null);
    if (!nile.userId) {
      return new NextResponse("Unauthorized");
    }
    console.log(body);
    const createTenantResponse = await nile.api.tenants.createTenant({
      name: body.name,
    });
    const tenant = await createTenantResponse.json();
    const tenantID = tenant.id;
    console.log("created tenant with tenantID: ", tenantID);

    const userInfo = await nile.db("users.users").where({
      id: nile.userId,
    });
    console.log(userInfo);

    const res = await nile
      .db("users.tenant_users")
      .where({
        tenant_id: tenantID,
        user_id: nile.userId,
      })
      .update({
        email: userInfo[0].email,
        roles: ["owner"],
      });
    console.log("after response");
    console.log(res);

    return new NextResponse("Tenant Created", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error Tenants route", { status: 500 });
  }
}

// DELETE FROM users.tenant_users WHERE tenant_id = '018c3550-939b-7bcd-9941-4a75f48d6f4c';
