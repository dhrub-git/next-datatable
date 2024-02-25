import { Projects, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { buttonVariants } from "@/components/ui/button"

async function getProjects(): Promise<Projects[]> {
  // Fetch data from your API here.
  const res = await fetch("https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects")
  const data = await res.json()
  return data
}

export default async function Page() {
  const data = await getProjects()

  return (
    <section className="py-24">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-10">All Projects</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
