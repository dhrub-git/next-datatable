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
import { DataTable } from "@/components/data-table";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      🟰
    </button>
  );
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Milestone = {
  createdAt: string;
  name: string;
  Status: number;
  
  avatar: string;
  Projects: string;
  Value: string;

  bsb: number;
  accountNumber: number;
  id: string;
};

export type Variance = {
  createdAt: string;
  name: string;
  Status: number;
  
 
};
const getVariance = async () => {
  const res = await fetch('/api/projectMilestone/1');
  const data = await res.json();
  console.log("variance data>>>"+JSON.stringify(data.variance));
  return data.variance;
};

export const VarianceColumn: ColumnDef<Variance>[] = [

  {
    accessorKey: "createdAt",
    header: "Creation Date",
  },
  {
    accessorKey: "change",
    header: "change",
  },
  {
    accessorKey: "varianceType",
    header: "varianceType",
  },
]
export const milestoneColumn: ColumnDef<Milestone>[] = [
  // {
  //   id: "drag-handle",
  //   header: "Change order",
  //   cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
  //   size: 60,
  // },
  // {
  //   id: "icon",
  //   cell: ({ row }) => {
  //     const payment = row.original;
  //     return (
  //       <Button size="icon">
  //         <MoreHorizontal className="h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    id: "icon",
    cell: ({ row }) => {
      const data = getVariance();
      console.log("data var>>>"+JSON.stringify(data));
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
            <DataTable columns={VarianceColumn} data={data} />
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
    accessorKey: "milestone_category.name",
    header: "Name",
  },
  {
    accessorKey: "status.name",
    header: "Status",
  },
 
  {
    accessorKey: "milestone_amount",
    header: () => <div className="text-right">Milestone Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("milestone_amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
 
  {
    accessorKey: "milestone_cumulative",
    header: () => <div className="text-right">Milestone Cumulative</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("milestone_cumulative"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "AUD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
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
            <DropdownMenuItem >View Project</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
