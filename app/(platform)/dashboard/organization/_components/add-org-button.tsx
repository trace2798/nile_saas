"use client";
import { Button } from "@/components/ui/button";
import { useOrgs } from "@/hooks/use-orgs";
import { FC } from "react";

interface AddOrgButtonProps {}

const AddOrgButton: FC<AddOrgButtonProps> = ({}) => {
  const orgs = useOrgs();
  return (
    <>
      <Button onClick={orgs.onOpen}>Create Organization</Button>
    </>
  );
};

export default AddOrgButton;
