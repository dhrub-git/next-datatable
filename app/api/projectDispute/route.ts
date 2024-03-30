

import { createProjectDispute, getAllDisputes } from "@/lib/data/projectDispute";
import { NextResponse } from "next/server";


/* POST Method to create a project dispuate */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create project disputae");
        const dispute = await request.json();
      
        
        dispute.createdBy="admin123";
        dispute.updatedBy="admin123";
        
        console.log("project POST 1>>>"+JSON.stringify(dispute));
       const newDispute  = await createProjectDispute(dispute);
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        return NextResponse.json({message: "Project Dispute Created Succesfully", newDispute}, {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating dispute", err},
            {status: 500,}
    
        )}

  

    };

    export const GET = async(req: Request, res: Response) => {

        try {
            const disputes = await  getAllDisputes();
            console.log("get All builders>>"+disputes);
        
            return NextResponse.json(
                {message: "OK", disputes},
                {status: 200,}
        
            )
        } catch (err) {
            console.log("GET Error"+err)
            return NextResponse.json(
                {message: "Error While getting Builders data", err},
                {status: 500,}
        
            )}
        }



   
   
   
 


