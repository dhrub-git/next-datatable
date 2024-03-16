import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React from "react";
import { Customers, columns } from "../../customers/columns";
import { DataTable } from "@/components/data-table";
import { CustomerForm } from "@/components/customer-form";
import { GetServerSideProps } from "next";

async function getCustomerbyID(): Promise<Customers[]> {
  //get id from url
  const res = await fetch(
    "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/customers/"
  );
  const customers = await res.json();
  return customers;
}

export default async function Page() {
  const customers = await getCustomerbyID();
  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Customer", link: "/customers" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <CustomerForm />
      <div className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {customers.map((customer) => (
            <li key={customer?.id}>{customer?.name}</li>
          ))}
        </h1>
      </div>
    </div>
  );
}
