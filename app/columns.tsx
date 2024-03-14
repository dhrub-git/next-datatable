"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Projects = {
  createdAt: string;
  name: string;
  status: string;
  customer: string;
  address: string;
  toyalValue: number;
  deliverdValue: number;
};

//function to call an url and get the data
const getProjects = async () => {
  const res = await fetch(
    "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects"
  );
  const data = await res.json();
  return data;
};

export const columns: ColumnDef<Projects>[] = [
  {
    id: "icon",
    cell: ({ row }) => {
      const data = getProjects();
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="relative">
              Show Variance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Show Variance</DialogTitle>
              <DialogDescription>
                Variation relates to the milestone# 1 : Digging
              </DialogDescription>
            </DialogHeader>
            <DataTable columns={columns} data={data} />
            <DialogFooter>
              <Button>Add Variance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
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
    header: () => <div className="text-right">Value</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalValue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "deliverdValue",
    header: "Delivered Value",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Create Dispute</DropdownMenuItem>
            <DropdownMenuItem>View Dispute</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
