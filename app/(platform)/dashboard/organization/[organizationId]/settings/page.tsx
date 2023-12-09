import MemberSelectForm from "@/components/modals/add-member-modal/member-select-form";
import nile from "@/lib/NileServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BillboardClient } from "./_components/client";

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
    .select("user_id", "roles");
  console.log(memberIds);

  const userInfos = await Promise.all(
    memberIds.map(async (memberId) => {
      const userId = memberId.user_id;
      const userInfoArray = await nile
        .db("users.users")
        .where({ id: userId })
        .select("*");
      const userInfo = userInfoArray[0]; // get the user object from the array
      return {
        ...userInfo,
        roles: memberId.roles,
      };
    })
  );
  console.log(userInfos);
  // const users = await nile.db("users.users").select("id", "email");
  // console.log(users);
  return (
    <>
      <div className="w-full">
        {userInfos.map((userInfo, index) => (
          <>
            {userInfo.id === nile.userId &&
            (userInfo.roles.includes("owner") ||
              userInfo.roles.includes("admin")) ? (
              <MemberSelectForm
                key={index}
                users={userInfos}
                tenantId={number}
              />
            ) : (
              ""
            )}
          </>
        ))}

        <BillboardClient data={userInfos} />
      </div>
    </>
  );
};

export default page;
