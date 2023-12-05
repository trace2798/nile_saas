"use client";
import { Button } from "@/components/ui/button";
import { MAX_FREE_TENANTS } from "@/constants/tenants";
import { useOrgs } from "@/hooks/use-orgs";
import { FC } from "react";

interface AddOrgButtonProps {
  count: number;
}

const AddOrgButton: FC<AddOrgButtonProps> = ({ count }) => {
  const orgs = useOrgs();
  return (
    <>
      {count < MAX_FREE_TENANTS ? (
        <>
          <Button onClick={orgs.onOpen}>Create Organization</Button>
        </>
      ) : (
        <>
          {" "}
          <Button onClick={orgs.onOpen} disabled>
            Create Organization
          </Button>
          <h1 className="mt-5 text-sm">You can create upto 1 Organization</h1>
        </>
      )}
    </>
  );
};

export default AddOrgButton;
