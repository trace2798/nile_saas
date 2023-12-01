"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

const OrgSelector = ({ orgs }: { orgs: any }) => {
  const router = useRouter();
  console.log(orgs);
  // const handleSelect = (id: string) => {
  //   router.push(`/dashboard/organization/${id}`);
  // };
  const [selectedOrg, setSelectedOrg] = useState("Change organization");
  const param = usePathname();
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
