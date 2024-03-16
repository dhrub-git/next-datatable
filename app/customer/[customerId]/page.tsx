import BreadCrumb from "@/components/breadcrumb";
import { ProjectForm } from "@/components/project-form";
import React from "react";

async function getProjects(): Promise<Projects[]> {
  const res = await fetch(
    "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects"
  );
  const data = await res.json();
  return data;
}

export default function Page() {
  interface PageProps {
    params: {
      productId: string;
    };
  }
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard/" },
    { title: "Project", link: "/dashboard/project" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProjectForm />
    </div>
  );
}
