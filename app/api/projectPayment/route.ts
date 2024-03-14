


import { createPayment, getAllPayments } from "@/lib/data/projectPayment";
import { NextResponse } from "next/server";


/* POST Method to create a project file */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create project payments");
        const payments = await request.json();
      
        
        console.log("project milestone POST 1>>>"+JSON.stringify(payments));
       const newPayments  = await createPayment(payments);
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        return NextResponse.json({message: "Project payments Created Succesfully", newPayments}, {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating payments", err},
            {status: 500,}
    
        )}

  

    };

    export const GET = async(req: Request, res: Response) => {

        try {
            const payments = await  getAllPayments()
            console.log("get All milestones>>"+payments);
        
            return NextResponse.json(
                {message: "OK", payments},
                {status: 200,}
        
            )
        } catch (err) {
            console.log("GET Error"+err)
            return NextResponse.json(
                {message: "Error While getting payments data", err},
                {status: 500,}
        
            )}
        }



   
   
   
 


