
import { NextResponse } from "next/server";

import { getDashboardSummary } from "@/lib/data/builder";
import { getBuilderCustomers } from "@/lib/data/customer";


export const GET = async(req: Request, res: Response) => {


    const buildID = req.url.split("api/builder/dashboard/")[1];
    console.log("inside of id>>>"+buildID);

    /* to fetch customer data*/

    const customers = await getBuilderCustomers(Number(buildID));

    console.log("customer >>"+customers.length)
    let activeCstr=0;
    let customerNames=null;
    for (let i = 0; i < customers.length; i++) {

        if (customers[i].customer_status.name=='ACTIVE' ) {
            activeCstr++;
            if (i<3){
            if (customerNames!=null ) {
                customerNames =customerNames+customers[i].customer_name + " "
            }else {
                customerNames=customers[i].customer_name + " "
            }
        }
        }
    }

      let cstSmry  = await getDashboardSummary(Number(buildID), String("customer"), false)
      const cstChange  = ((cstSmry[0].count-cstSmry[1].count)/cstSmry[1].count)*100;

      let prjSmry  = await getDashboardSummary(Number(buildID), String("project"), false)
      const prjChange  = ((prjSmry[0].count-prjSmry[1].count)/prjSmry[1].count)*100;


      let paySmry  = await getDashboardSummary(Number(buildID), String("project"), true)
      const payChange  = ((paySmry[0].sum-paySmry[1].sum)/paySmry[1].sum)*100;

       let summary = {
        cstTotal: cstSmry[0].sum,
        cstChange: cstChange,
        prjTotal: prjSmry[0].sum,
        prjChange: prjChange,
        activeCstr: activeCstr,
        customerNames: customerNames,
        payTotal: parseInt(paySmry[0].sum) + parseInt(paySmry[1].sum),
        payChange: payChange
      }

      console.log("respone at the end >>>"+summary)
    return NextResponse.json( {message: "OK",customers,summary}, {status: 200,})
};

