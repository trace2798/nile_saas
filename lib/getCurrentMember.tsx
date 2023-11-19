import { FC } from "react";
import nile from "./NileServer";



const getCurrentMember = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  console.log(organizationId);
  let users = await nile
    .db("users")
    .select("users.id", "users.name")
    .join("tenant_users", "users.id", "=", "tenant_users.user_id")
    .where("tenant_users.tenant_id", "=", organizationId);

  console.log(`Members of tenant ${organizationId}:`, users);

  return (
    <>
      <div>getCurrentMember</div>
    </>
  );
};

export default getCurrentMember;
