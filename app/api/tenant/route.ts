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
    return new NextResponse("Tenant Created", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
