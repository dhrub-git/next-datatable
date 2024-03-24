import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React from "react";
import { Customers, columns } from "../../customers/columns";
import { DataTable } from "@/components/data-table";
import { CustomerForm } from "@/components/customer-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default async function Page({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Customer", link: "/customers" },
  ];

  const res = await fetch(
    `https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/customers/${params.id}`,
    { cache: "no-store" }
  );
  const data = (await res.json()) as {
    createdAt: string;
    name: string;
    avatar: string;
    Projects: string;
    Value: string;
    Status: string;
    bsb: string;
    accountNumber: string;
    id: string;
    email: string;
    addressline1: string;
    addressline2: string;
    city: string;
    state: string;
    zip: string;
  };

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="col-span-full space-y-3 lg:col-span-4">
        <CustomerForm
          initialValues={{
            customername: data.name,
            state: data.state,
            city: data.city,
            addressline1: data.addressline1,
            addressline2: data.addressline2,
            zip: data.zip,
          }}
        />
      </div>
    </div>
  );
}
