"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Customers, columns } from "../../customers/columns";
import { DataTable } from "@/components/data-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



function Project({ params }: { params: { id: string } }) {

  const data =null;

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Customer", link: "/customers" },
  ];

   const [proj, setProj] = useState([] as any);
 
  useEffect(() => {
    
    fetch('/api/project/'+params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log('response>>'+JSON.stringify(data))
        setProj(data.project)  
      })
  }, [])



  
  return (
    <div className="flex-1 space-y-4 p-8">
    <BreadCrumb items={breadcrumbItems} />
    <ProjectForm projectId={params.id}/>

    <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="milestones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="payment">Payment Progress</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="milestones" className="space-y-4">
            <DataTable columns={columns} data={proj} />
          </TabsContent>
          <TabsContent value="disputes" className="space-y-4">
            <DataTable columns={columns} data={proj} />
          </TabsContent>
          <TabsContent value="payment" className="space-y-4">
            <DataTable columns={columns} data={proj} />
          </TabsContent>
          <TabsContent value="files" className="space-y-4">
            <DataTable columns={columns} data={proj} />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <DataTable columns={columns} data={proj} />
          </TabsContent>
        </Tabs>
      </div>
  </div>
  
  );
}

export default Project