import { Card } from "@/components/ui/card";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AddOrgButton from "./_components/add-org-button";
import Link from "next/link";
import { getAvailableTenantCount } from "@/lib/tenant-limit";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  configureNile(cookies().get("authData"), null);
  console.log("showing tenants page for user: " + nile.userId);
  if (!nile.userId) {
    redirect("/");
  }
  let tenants: any = [];
  if (nile.userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    tenants = await nile
      .db("tenants")
      .select("tenants.id", "tenants.name")
      .join("users.tenant_users", "tenants.id", "=", "tenant_users.tenant_id")
      .where("tenant_users.user_id", "=", nile.userId);
  }
  console.log(nile.userId);
  const countResult = (await getAvailableTenantCount()) as { count: string }[];
  const count = Number(countResult[0].count);
  console.log(count);

  return (
    <>
      {/* <div className="mt-24">Select Org or Create org logic will come here</div> */}
      <div className="ml-[5vw] flex flex-col justify-center items-center mt-24">
        <Card className="max-w-sm p-3 flex items-center justify-center">
          <AddOrgButton />
        </Card>
        <Separator className="max-w-xl my-5" />
        <Label className="text-lg">Your Organizations</Label>
        {tenants.length === 0 && (
          <>
            <h1 className="mt-3">
              You are not part of any organization. Add one to get started.
            </h1>
          </>
        )}
        {tenants.map((tenant: { id: string; name: string }) => (
          <Link
            href={`/dashboard/organization/${tenant.id}`}
            className="group space-y-3 mt-3"
            key={tenant.id}
          >
            <Card
              key={tenant.id}
              className="p-5 text-center group-hover:text-indigo-400"
            >
              <h1>{tenant.name}</h1>
              <h1>{tenant.id}</h1>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default page;
