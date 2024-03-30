
import { createVariance } from "@/lib/data/variance";
import { NextResponse } from "next/server";


/* POST Method to create a project file */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create Milestone variance");
        const milestone = await request.json();
      
        
        console.log(" milestone variancePOST 1>>>"+JSON.stringify(milestone));
       const newMilestone  = await createVariance(milestone, true);
      
      
        return NextResponse.json({message: "Milestone variance Created Succesfully", newMilestone}, 
        {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating mileston variance", err},
            {status: 500,}
    
        )}

  

    };

    // export const GET = async(req: Request, res: Response) => {

    //     try {
    //         const milestones = await  getAllMilestone();
    //         console.log("get All milestone variance >>"+milestones);
        
    //         return NextResponse.json(
    //             {message: "OK", milestones},
    //             {status: 200,}
        
    //         )
    //     } catch (err) {
    //         console.log("GET Error"+err)
    //         return NextResponse.json(
    //             {message: "Error While getting vrainces data", err},
    //             {status: 500,}
        
    //         )}
    //     }



   
   
   
 


