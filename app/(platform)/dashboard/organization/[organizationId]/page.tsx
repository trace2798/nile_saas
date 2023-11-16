import { Separator } from "@/components/ui/separator";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
// import { checkSubscription } from "@/lib/subscription";
// import { Info } from "./_components/info";
// import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const OrganizationIdPage = async ({ params }: { params: { organizationId: string } }) => {
  configureNile(cookies().get("authData"), params.organizationId);

  console.log(
    "showing todos for user " + nile.userId + " for tenant " + nile.tenantId
  );
  const resp = await nile.api.tenants.getTenant();
  console.log(resp)
  const tenant = await resp.json();
  console.log(tenant);
//   const todos = await nile.db("todos").select("*").orderBy("created_at","desc"); // no need for where clause because we previously set Nile context
//   console.log(todos);
//   const isPro = await checkSubscription();
  return (
    <div className="w-full mb-20">
      {/* <Info isPro={isPro} /> */}
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense >
          {/* <BoardList /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
