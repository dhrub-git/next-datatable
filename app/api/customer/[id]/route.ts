
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { exit } from "process";
import { split } from "postcss/lib/list";
import { getCustomerData } from "@/lib/data/customer";

export const GET = async(req: Request, res: Response) => {

    const customerId = req.url.split("api/customer/")[1];
    console.log("inside of id>>>"+customerId);

    const customers = await getCustomerData(Number(customerId));

    console.log("cusomers in the /api/builder/customer>>>"+JSON.stringify(customers));

    return NextResponse.json({message: "OK", customers}, {status: 200,})
    

};

