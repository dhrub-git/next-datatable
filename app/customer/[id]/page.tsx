import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React from "react";
import { Customers, columns } from "../../customers/columns";
import { DataTable } from "@/components/data-table";
import { CustomerForm } from "@/components/customer-form";

export default async function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Customer", link: "/customers" },
  ];

  const res = await fetch(
    `https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/customers/${params.id}`,
    { cache: "no-store" }
  );
  const data = (await res.json()) as { name: string; Status: string };

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <CustomerForm />

      <div className="grid grid-cols-6 gap-x-6 gap-y-3">
        <div className="col-span-full space-y-3 lg:col-span-4">
          <h1 className="truncate text-2xl font-medium capitalize">
            Customer Name : {data.name}
          </h1>
          <p className="font-medium text-gray-500">{data.Status}</p>
        </div>
      </div>
    </div>
  );
}
