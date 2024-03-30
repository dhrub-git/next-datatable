"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React, { FunctionComponent, useEffect, useState } from "react";
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

function Customer({ params }: { params: { id: string } }) {

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Customer", link: "/customers" },
  ];


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

  const [cstmr, setCust] = useState([] as any);
 
  useEffect(() => {
    
    fetch('/api/customer/'+params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log('response>>'+JSON.stringify(data))

      
        setCust(data.customers)
  
      
      })
  }, [])


  const data = (cstmr) as {
    id: number;
    builderId: number;
    statusId: number;
    createdAt: string;
    customer_name: string;
    email: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postcode: string;
  };

  console.log("data >>>"+JSON.stringify(data));
  return (
    <div className="flex-1 space-y-4 p-8">

    <BreadCrumb items={breadcrumbItems} />
    <CustomerForm   initialValues={{
            customerId: data.id,
            builderId: data.builderId,
            statusId: data.statusId,
            customername: data.customer_name,
            email: data.email,
            state: data.state,
            city: data.city,
            addressline1: data.address_line_1,
            addressline2: data.address_line_2,
            zip: data.postcode,
          }}/>

    
  </div>

  );
}

export default Customer