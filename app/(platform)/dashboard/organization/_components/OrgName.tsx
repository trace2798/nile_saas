import nile from "@/lib/NileServer";
import { FC } from "react";

interface OrgNameProps {}

const OrgName = async ({ id }: { id: string }) => {
  const name = await nile.db("tenants").where({ id: id }).select("name");
  return (
    <>
      <div>OrgName</div>
    </>
  );
};

export default OrgName;
