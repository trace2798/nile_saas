"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: string;
  email: string;
  createdAt: string;
  name: string;
  role: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("roles")}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
