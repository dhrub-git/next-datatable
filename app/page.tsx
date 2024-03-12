import PageTitle from "@/components/page-title";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardProps } from "@/components/card";
import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { Projects, columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cardData: CardProps[] = [
  {
    label: "Total Customers",
    amount: "45",
    discription: "+25% from last month",
    icon: Activity,
  },
  {
    label: "Projests",
    amount: "8",
    discription: "+180.1% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Customers",
    amount: "5",
    discription: "Dhrub, James, John, Smith, and 2 others",
    icon: Users,
  },
  {
    label: "Pending Payments",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
];

async function getProjects(): Promise<Projects[]> {
  // Fetch data from your API here.
  const res = await fetch(
    "https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects"
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const data = await getProjects();

  return (
    <div className="flex flex-col gap-5  w-full p-5">
      <PageTitle title="Dashboard"></PageTitle>

      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 p-5">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <div className="flex justify-between items-center space-x-2">
        <Link href="/customers">
          <Button>Add Customer</Button>
        </Link>
        <Link href="/projects">
          <Button>Add Project</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
