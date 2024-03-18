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
      <h1 className="text-4xl font-bold mb-10">All Projects 🔴 🟢 🟡</h1>
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
            <DataTable columns={columns} data={data} />
          </TabsContent>
          <TabsContent value="disputes" className="space-y-4">
            <DataTable columns={columns} data={data} />
          </TabsContent>
          <TabsContent value="payment" className="space-y-4">
            <DataTable columns={columns} data={data} />
          </TabsContent>
          <TabsContent value="files" className="space-y-4">
            <DataTable columns={columns} data={data} />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <DataTable columns={columns} data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
