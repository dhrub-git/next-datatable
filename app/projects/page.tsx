import { DataTable } from "@/components/data-table";
import { Projects, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { ProjectForm } from "@/components/project-form";
import PageTitle from "@/components/page-title";
import { Grid } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getProjects(): Promise<Projects[]> {
  const res = await fetch(
    "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects"
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getProjects();

  return (
    <div className="container mx-auto py-10">
      <PageTitle title="Add a Project"></PageTitle>
      <Separator />
      <ProjectForm />
      <Separator />
      {/* <h1 className="text-4xl font-bold mb-10">All Projects 🔴 🟢 🟡</h1> */}
      
    </div>
  );
}
