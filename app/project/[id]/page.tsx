"use client";
import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Customers, columns } from "../../customers/columns";
import { milestoneColumn } from "../../project/milestoneColumn";
import { disputeColumn } from "../disputeColumn";
import { DataTable } from "@/components/data-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



function Project({ params }: { params: { id: string } }) {

  const data =null;

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Project", link: "/projects" },
  ];

   const [proj, setProj] = useState([] as any);
   const [milestone, setMilestone] = useState([] as any);
   const [dispute, setDispute] = useState([] as any);
 
  useEffect(() => {
    
    fetch('/api/project/'+params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log('response in the page.tsx>>'+JSON.stringify(data))
        setProj(data.project)  
        setMilestone(data.project.project_milestone)
        setDispute(data.project.project_disputes)
      })
  }, [])



  
  return (
    <div className="flex-1 space-y-4 p-8">
    <BreadCrumb items={breadcrumbItems} />
    <ProjectForm initialValues={{
        builderId:  proj.builderId,
        statusId: proj.statusId,
        projectId: proj.id,
        managed_by_id: proj.managed_by_id,
        projectname : proj.project_name,
        customername: proj.customerId,
        addressline1: proj.address_line_1,
        addressline2:proj.address_line_2,
        city: proj.city,
        state: proj.state,
        zip:proj.postcode,
        projectvalue:String(proj.project_value),
        contract:proj.project_contract_details,
        estimatedenddate: proj.project_end_date
    }}/>

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
            <DataTable columns={milestoneColumn} data={milestone} />
          </TabsContent>
          <TabsContent value="disputes" className="space-y-4">
            <DataTable columns={disputeColumn} data={dispute} />
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