"use client";
import PageTitle from "@/components/page-title";
import { DollarSign, Users, CreditCard, Activity, LucideIcon } from "lucide-react";
import  Card, {  CardProps } from "@/components/card";
import { TabsList } from "@radix-ui/react-tabs";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { Projects, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { FunctionComponent, useState , useEffect, Key} from "react";
import Link from "next/link";

const Builder: FunctionComponent = () => {

 
  
  const [cstmr, setPosts] = useState([] as any);
  const [cardData, setCardData] = useState([] as any);

  useEffect(() => {
    
    fetch('/api/builder/dashboard/1')
      .then((res) => res.json())
      .then((data) => {
        console.log('response>>'+JSON.stringify(data))

      
        setPosts(data.customers)
       // setCardData(data.summary)
      
        setCardData([
          
                  {
                    label: "Total Customers",
                   // amount: "8",
                    amount: data.summary.cstTotal,
                    discription: data.summary.cstChange +" % from last month",
                    icon: Activity
                  },
                  {
                    label: "Projests",
                    amount: data.summary.prjTotal,
                    discription: data.summary.prjChange +" % from last month",
                    icon: CreditCard
                  },
                  {
                    label: "Active Customers",
                    amount: data.summary.activeCstr,
                    discription: data.summary.customerNames + " and others",
                    icon: Users
                  },
                  {
                    label: "Pending Payments",
                    amount: data.summary.payTotal,
                    discription:  data.summary.payChange +" % from last month",
                    icon: DollarSign
                  }
                ]
              )
      
      })
  }, [])




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
        <DataTable columns={columns} data={cstmr} /> 
    </div>
  );

};
export default Builder


// const [posts, setPosts] = useState([] as any);

// async function getProjects(): Promise<Projects[]> {
//   // Fetch data from your API here.
//   const res = await fetch("https://65dace5cbcc50200fcdd3425.mockapi.io/api/v1/Projects")
//   const data = await res.json()
//   return data
// }

// export default async function Home() {
//   const data = await getProjects()

  // return (
  //   <div className="flex flex-col gap-5  w-full p-5">
  //     <PageTitle title="Dashboard"></PageTitle>

  //     <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 p-5">
  //       {cardData.map((d, i) => (
  //         <Card
  //           key={i}
  //           amount={d.amount}
  //           discription={d.discription}
  //           icon={d.icon}
  //           label={d.label}
  //         />
  //       ))}
  //     </section>
  //     <div className="flex items-center space-x-2">
  //       <Button>Add Customer</Button>
  //     </div>
  //     <DataTable columns={columns} data={data} />
  //   </div>
  // );
// }
