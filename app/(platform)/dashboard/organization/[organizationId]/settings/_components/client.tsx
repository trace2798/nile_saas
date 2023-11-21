"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
// import { ApiList } from "@/components/ui/api-list";

import { columns, BillboardColumn } from "./columns";
import { AddMemberModal } from "@/components/modals/add-member-modal/add-member-modal";
import { useMemberModal } from "@/hooks/use-member-modal";

interface BillboardClientProps {
  data: BillboardColumn[][];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  //   console.log(params)
  const id = params.organizationId;
  console.log(id);
  const router = useRouter();
  const memberModal = useMemberModal();
  const flattenedData = data.reduce((acc, curr) => [...acc, ...curr], []);
  return (
    <>
      <Heading
        title={`Members (${data.length})`}
        description="Manage member for your organization"
      />
      {/* <div className="flex items-center justify-between">
        <Button onClick={() => memberModal.onOpen(id as string)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Member
        </Button>
      </div> */}
      <Separator className="my-5" />
      <DataTable searchKey="email" columns={columns} data={flattenedData} />
      {/* {data.map((info, index) => {
        // console.log(data)
        
        <DataTable searchKey="email" columns={columns} data={info} />;
      })} */}
      {/* <Heading title="API" description="API Calls for Billboards" /> */}
      <Separator />
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  );
};
