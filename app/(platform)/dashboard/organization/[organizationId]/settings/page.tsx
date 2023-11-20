import { Table, TableCaption } from "@/components/ui/table";
import nile from "@/lib/NileServer";
import getCurrentMember from "@/lib/getCurrentMember";
import { FC } from "react";
import { BillboardClient } from "./_components/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ComboboxForm from "@/components/modals/add-member-modal/member-select-form";

interface pageProps {}

const page = async ({}) => {
  const headersList = headers();
  console.log(headersList);
  const referer = headersList.get("referer");
  console.log(referer);
  if (!referer) {
    redirect("/");
  }
  const parts = referer.split("/");
  const number = parts[5];
  console.log(number);

  const memberIds = await nile
    .db("users.tenant_users")
    .where({ tenant_id: number })
    .select("user_id");
  console.log(memberIds);
  const userInfos = await Promise.all(
    memberIds.map(async (memberId) => {
      const userId = memberId.user_id;
      return await nile.db("users.users").where({ id: userId }).select("*");
    })
  );
  console.log(userInfos);
  const users = await nile.db("users.users").select("id", "email");
  console.log(users);
  return (
    <>
      {/* <div>Settings Page</div> */}
      <div className="w-full">
        {/* {userInfos.map((userArray) => (
          <div key={userArray[0].id}>
            {userArray.map((userInfo) => (
              <div key={userInfo.id}>
                <p>{userInfo.email}</p>
              </div>
            ))}
          </div>
        ))} */}
        <ComboboxForm users={users} />
        <BillboardClient data={userInfos} />
      </div>
    </>
  );
};

export default page;
// 018be8a9-0d66-7ae9-91cc-d09678c883dc
