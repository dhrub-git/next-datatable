
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createManagedStaff, getAllManagedStaff } from "@/lib/data/managedBy";

export const GET = async(req: Request, res: Response) => {

    try {
        const managedBy = await  getAllManagedStaff()
        console.log("get All Managed Staff>>"+managedBy);
    
        return NextResponse.json(
            {message: "OK", managedBy},
            {status: 200,}
    
        )
    } catch (err) {
        console.log("GET Error"+err)
        return NextResponse.json(
            {message: "Error While getting Managed Staff data", err},
            {status: 500,}
    
        )}
    };
   


export async function POST(request: Request) {

    try {
        const staff = await request.json();
   
        //  buildr.createdBy="admin123";
         // buildr.updatedBy="admin123";
        const newStaff  = await createManagedStaff(staff);
      
        return NextResponse.json({"status":200,"message":"Managed Staff Created Succesfully", newStaff});
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating manged Staff", err},
            {status: 500,}
    
        )}

  

    };
 
  
  
 


