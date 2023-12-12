import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";
import { FC, Suspense } from "react";
// import { BoardListPersonal } from "./_components/board-list-personal";

interface pageProps {}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

const page: FC<pageProps> = async ({}) => {
  configureNile(cookies().get("authData"), nile.userId);

  console.log("showing boards for user " + nile.userId);
  const userInfo = await nile.db("users.users").where({
    id: nile.userId,
  });
  console.log(userInfo);
  return (
    <>
      <div className="w-full mb-20">
        {/* <Info name={tenant.name} /> */}
        <Heading
          title={`Welcome, ${userInfo[0].name}`}
          description="Here are your Boards"
        />
        <Separator className="my-4" />
        <div className="px-2 md:px-4">
          <Suspense>
            {/* {nile.userId ? <BoardListPersonal user_id={nile.userId} /> : ""} */}

            {/* <BoardList organizationId={params.organizationId} /> */}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default page;
