"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const OrgSelector = ({ orgs }: { orgs: any }) => {
  const router = useRouter();
  const param = usePathname();
  console.log(orgs);
  // const handleSelect = (id: string) => {
  //   router.push(`/dashboard/organization/${id}`);
  // };
  const [selectedOrg, setSelectedOrg] = useState("Change organization");
  console.log(param);

  const handleSelect = (id: string, name: string) => {
    setSelectedOrg(name);
    router.push(`/dashboard/organization/${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[180px] md:w-[280px] border p-1 rounded-lg flex justify-between items-center font-light dark:bg-zinc-900">
        {selectedOrg}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            You are part of the following orgs
          </DropdownMenuLabel>
          {orgs.map((org: { id: string; name: string }) => (
            <DropdownMenuItem
              className="p-1 hover:cursor-pointer"
              onClick={() => handleSelect(org.id, org.name)}
              key={org.id}
            >
              {org.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrgSelector;
