import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { CustomerForm } from "@/components/customer-form";
import PageTitle from "@/components/page-title";
import { Customers, columns } from "./columns";

// async function getCustomers(): Promise<Customers[]> {
//   const res = await fetch(
//     "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/customers"
//   );
//   const data = await res.json();
//   return data;
// }

export default async function Page() {
 // const data = await getCustomers();
  return (
    <div className="container mx-auto py-10">
      <PageTitle title="Add a Customer"></PageTitle>
      <Separator />
      <CustomerForm />
      <Separator />
    {/* //  <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
