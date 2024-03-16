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
export type Customers = {
  createdAt: string;
  name: string;
  avatar: string;
  Projects: string;
  Value: string;
  Status: number;
  bsb: number;
  accountNumber: number;
  id: string;
};

export const columns: ColumnDef<Customers>[] = [
  {
    id: "drag-handle",
    header: "Change order",
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
    size: 60,
  },
  {
    id: "icon",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
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
    accessorKey: "Projects",
    header: "Projects",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "Value",
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
    accessorKey: "bsb",
    header: "Delivered BSB",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
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
            <DropdownMenuItem>View Project</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
