
import { createVariance, getVariance } from "@/lib/data/variance";
import { NextResponse } from "next/server";




    export const GET = async(req: Request, res: Response) => {

        const getRequestType = req.url.split("api/projectMilestone/")[1];
    
        try {
            console.log("get variance>>>"+getRequestType);
            const variance = await getVariance(Number(getRequestType));
        
            return NextResponse.json({message: "OK", variance}, {status: 200,})

            }
            catch (err) {
                console.log("GET Error"+err)
                return NextResponse.json(
                    {message: "Error While getting variance data", err},
                    {status: 500,}
            
                )}  
        }



   
   
   
 


