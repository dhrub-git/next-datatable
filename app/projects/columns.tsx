"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Projects = {
  createdAt: string
  name: string
  status: string
  customer: string
  address: string
  toyalValue: number
  deliverdValue: number
}

export const columns: ColumnDef<Projects>[] = [

  {
    accessorKey: "createdAt",
    header: "Creation Date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalValue",
    header: "Value",
  },
  {
    accessorKey: "deliverdValue",
    header: "Delivered Value",
  },
]