

import { createMilestone, getAllMilestone } from "@/lib/data/projectMilestone";
import { NextResponse } from "next/server";


/* POST Method to create a project file */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create project milestone");
        const milestone = await request.json();
      
        
        console.log("project milestone POST 1>>>"+JSON.stringify(milestone));
       const newMilestone  = await createMilestone(milestone);
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        return NextResponse.json({message: "Project milestone Created Succesfully", newMilestone}, {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating dispute", err},
            {status: 500,}
    
        )}

  

    };

    export const GET = async(req: Request, res: Response) => {

        try {
            const milestones = await  getAllMilestone();
            console.log("get All milestones>>"+milestones);
        
            return NextResponse.json(
                {message: "OK", milestones},
                {status: 200,}
        
            )
        } catch (err) {
            console.log("GET Error"+err)
            return NextResponse.json(
                {message: "Error While getting Builders data", err},
                {status: 500,}
        
            )}
        }



   
   
   
 


