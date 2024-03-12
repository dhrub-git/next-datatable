import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { CustomerForm } from "@/components/customer-form";
import PageTitle from "@/components/page-title";

export default async function Page() {
  return (
    <div className="container mx-auto py-10">
      <PageTitle title="Add a Customer"></PageTitle>
      <Separator />
      <CustomerForm />
      <Separator />
    </div>
  );
}
