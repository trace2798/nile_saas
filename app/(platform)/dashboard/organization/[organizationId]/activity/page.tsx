import nile from "@/lib/NileServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";
import ActivityCard from "./_components/activity-card";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
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
  const activity = await nile.db("audit_log").where({ tenant_id: number });
  console.log(activity);
  return (
    <>
      <div>
        {activity.map((item, index) => (
          <ActivityCard activity={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default page;
