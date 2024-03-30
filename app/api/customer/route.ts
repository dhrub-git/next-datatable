

import { createUpdateCustomer } from "@/lib/data/customer";
import { NextResponse } from "next/server";


/* POST Method to create a customer */

export async function POST(request: Request) {

    try {

        console.log("inside thepost");
        const customer = await request.json();
        console.log("customer POST 1>>>"+JSON.stringify(customer));
        
        customer.createdBy="admin123";
        customer.updatedBy="admin123";
      //  customer.builderId=1;
       // customer.statusId=1;
        customer.managed_by_id=2;
        
        const newCustomer  = await createUpdateCustomer(customer);
      
        return NextResponse.json({"status":200,"message":"Customer Created Succesfully", "newCustomer": newCustomer.id});
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating Customer", err},
            {status: 500,}
    
        )}

  

    };





   
   
   
 


