"use client";

import { Database } from "@/types/generated/database.types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<
  Database["public"]["Tables"]["Services"]["Row"]
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active");
      return active ? "Yes" : "No";
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "features",
    header: "Features",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
];
