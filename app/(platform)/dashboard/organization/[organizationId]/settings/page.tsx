import { Table, TableCaption } from "@/components/ui/table";
import nile from "@/lib/NileServer";
import getCurrentMember from "@/lib/getCurrentMember";
import { FC } from "react";
import { BillboardClient } from "./_components/client";

interface pageProps {}

const page = async ({}) => {
  const memberIds = await nile
    .db("users.tenant_users")
    .where({ tenant_id: "018bd75d-05e2-72d6-9d70-222f484e94ca" })
    .select("user_id");
  console.log(memberIds);
  const userInfos = await Promise.all(
    memberIds.map(async (memberId) => {
      const userId = memberId.user_id;
      return await nile.db("users.users").where({ id: userId }).select("*");
    })
  );
  console.log(userInfos);
  return (
    <>
      {/* <div>Settings Page</div> */}
      <div>
        {userInfos.map((userArray) => (
          <div key={userArray[0].id}>
            {userArray.map((userInfo) => (
              <div key={userInfo.id}>
                {/* <p>{userInfo.name}</p> */}
                <p>{userInfo.email}</p>
              </div>
            ))}
          </div>
        ))}
        <BillboardClient data={userInfos} />
      </div>
    </>
  );
};

export default page;
// 018be8a9-0d66-7ae9-91cc-d09678c883dc
