import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Projects", link: "/dashboard/projects" },
    { title: "Create", link: "/dashboard/projects/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProjectForm />
    </div>
  );
}
