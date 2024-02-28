import { DataTable } from "@/components/data-table";
import { Projects, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { ProjectForm } from "@/components/project-form";

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
      <img src="../../public/image.png" alt="" />
      <h2>Lavender Reno</h2>
      <Separator />
      <ProjectForm />
      <Separator />
      <h1 className="text-4xl font-bold mb-10">All Projects 🔴 🟢 🟡</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
