
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { exit } from "process";
import { split } from "postcss/lib/list";
import { getProjectData } from "@/lib/data/project";

export const GET = async(req: Request, res: Response) => {

    const getRequestType = req.url.split("api/project/")[1];
    
            try {
                console.log("get project>>>"+getRequestType);
                const project = await getProjectData(Number(getRequestType));
            
                return NextResponse.json({message: "OK", project}, {status: 200,})
    
                }
                catch (err) {
                    console.log("GET Error"+err)
                    return NextResponse.json(
                        {message: "Error While getting project data", err},
                        {status: 500,}
                
                    )}    

    }


