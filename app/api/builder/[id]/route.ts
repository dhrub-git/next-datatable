
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteBuilder, getBuilderData, updateBuilder } from "@/lib/data/builder";
import { exit } from "process";
import { split } from "postcss/lib/list";

export const GET = async(req: Request, res: Response) => {

    const getRequestType = req.url.split("api/builder/")[1];
    console.log("getRequestType>>"+getRequestType.split("/")[0] +"<<<<[1]>>>"+getRequestType.split("/1")[1]);
    switch (getRequestType) {

        case 'customerSummary' :

            console.log("customerSummary>>");
            return NextResponse.json( {message: "OK",}, {status: 200,})
            break

        case 'getProjectCount' :
             
            console.log("getProjectCount>>");
            return NextResponse.json( {message: "OK",}, {status: 200,})
            break

        case 'getCustomerData' :
             
            console.log("getCustomerData>>");
            return NextResponse.json( {message: "OK",}, {status: 200,})
            break    

        default:
            try {
                console.log("get builderid>>>"+getRequestType);
                const builders = await getBuilderData(Number(getRequestType));
            
                if (builders==null){
                    console.log("no builder records");
                    return NextResponse.json(
                        {message: "No Records available"},
                        {status: 200,}
                
                    )
                    exit;
                } else {
                    console.log("buildersLatest>>"+builders);
                    return NextResponse.json(
                        {message: "OK", builders},
                        {status: 200,}
                
                    )
                }
                }
                catch (err) {
                    console.log("GET Error"+err)
                    return NextResponse.json(
                        {message: "Error While getting builder data", err},
                        {status: 500,}
                
                    )}    

    }

};

export async function PUT(req: Request, res: Response) {

    try 
    {
        const buildID = req.url.split("builder/")[1];
        console.log("id>>>"+Number(buildID));
    
        const updBuilder  = await req.json();
        updBuilder.id=Number(buildID)
    
        const builders = await updateBuilder(updBuilder
            );
        console.log("buildersLatest>>"+builders);
    
        return NextResponse.json({"status":200,"message":"Builder Updated Succesfully", updBuilder});

    } catch (err) {
        console.log("GET Error>>"+err);
        return NextResponse.json(
            {message: "Error While Updating Builder", err},
            {status: 500,}
    
        )}
  
}

export async function DELETE(req: Request, res: Response) {

    try 
    {
        const buildID = req.url.split("builder/")[1];
        console.log("id>>>"+Number(buildID));
    
       const del =  await deleteBuilder(Number(buildID));
       console.log("del>>>"+del);
       return NextResponse.json({"status":200,"message":"Builder Deleted Succesfully"});

    }
    catch (err) {
        console.log("GET Error>>"+err);
        return NextResponse.json(
            {message: "Error While Deleting Builder", err},
            {status: 500,}
    
        )}
}
