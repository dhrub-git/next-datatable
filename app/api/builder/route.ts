
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createBuilder, getAllBuilders, updateBuilder } from "@/lib/data/builder";

export const GET = async(req: Request, res: Response) => {

    try {
        const builders = await  getAllBuilders();
        console.log("get All builders>>"+builders);
    
        return NextResponse.json(
            {message: "OK", builders},
            {status: 200,}
    
        )
    } catch (err) {
        console.log("GET Error"+err)
        return NextResponse.json(
            {message: "Error While getting Builders data", err},
            {status: 500,}
    
        )}
    };
   


export async function POST(request: Request) {

    try {
        const buildr = await request.json();
   
        //  buildr.createdBy="admin123";
         // buildr.updatedBy="admin123";
        const newBuilder  = await createBuilder(buildr);
      
        return NextResponse.json({"status":200,"message":"Builder Created Succesfully", newBuilder});
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating Builder", err},
            {status: 500,}
    
        )}

  

    };
 
    export async function PUT(request: Request) {

       try {
        const buildr = await request.json();
        const updBuilder  = await updateBuilder(buildr);
      
        return NextResponse.json({"status":200,"message":"Builder Updated Succesfully", updBuilder});
      
         }catch (err) {
            console.log("PUT Error"+err)
        return NextResponse.json(
            {message: "Error While Updating Builder", err},
            {status: 500,}
    
        )}
    
    
    };

    export async function getCount() {

        return NextResponse.json({"status":200,"message":"Count is 200"});

    }
   
 


