"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: string;
  email: string;
  createdAt: string;
  name: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
