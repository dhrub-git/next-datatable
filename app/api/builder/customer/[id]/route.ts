
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { exit } from "process";
import { split } from "postcss/lib/list";
import { getCustomers } from "@/lib/data/customer";

export const GET = async(req: Request, res: Response) => {

    const buildID = req.url.split("api/builder/customer/")[1];
    console.log("inside of id>>>"+buildID);

    const customers = await getCustomers(Number(buildID));

    console.log("cusomers in the /api/builder/customer>>>"+JSON.stringify(customers));

    return NextResponse.json({message: "OK", customers}, {status: 200,})
    

};

