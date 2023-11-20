"use server";

import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";

export async function addMember(
  tenantId: string,
  email: string,
  user_id: string
) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "adding member " +
      email +
      "with id of" +
      user_id +
      " to tenant:" +
      nile.tenantId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    const existingMembers = await nile
      .db("users.tenant_users")
      .where({ tenant_id: tenantId, user_id: user_id });

    if (existingMembers.length > 0) {
      console.log("User already exists in the organization");
      return { message: "User already exists in the organization" };
    }

    await nile.db("users.tenant_users").insert({
      tenant_id: tenantId,
      user_id: user_id,
    });
    return { message: "User Added" };
    // console.log("FRMO MEMBER ADD ACTION");
  } catch (e) {
    console.error(e);
    return { message: "Failed to add member" };
  }
}

export async function removeMember(
  tenantId: string,
  // email: string,
  user_id: string
) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "removing member " +
      // email +
      "with id of" +
      user_id +
      " from tenant:" +
      nile.tenantId
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    await nile
      .db("users.tenant_users")
      .where({
        tenant_id: tenantId,
        user_id: user_id,
      })
      .del();
    console.log("Member Removed");
  } catch (e) {
    console.error(e);
    return { message: "Failed to remove member" };
  }
}
