

import { createProjectFile, getAllFiles } from "@/lib/data/projectFile";
import { NextResponse } from "next/server";


/* POST Method to create a project file */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create project file");
        const file = await request.json();
      
        
        console.log("project file POST 1>>>"+JSON.stringify(file));
       const newFile  = await createProjectFile(file);
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        return NextResponse.json({message: "Project File Created Succesfully", newFile}, {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating dispute", err},
            {status: 500,}
    
        )}

  

    };

    export const GET = async(req: Request, res: Response) => {

        try {
            const files = await  getAllFiles();
            console.log("get All builders>>"+files);
        
            return NextResponse.json(
                {message: "OK", files},
                {status: 200,}
        
            )
        } catch (err) {
            console.log("GET Error"+err)
            return NextResponse.json(
                {message: "Error While getting Builders data", err},
                {status: 500,}
        
            )}
        }



   
   
   
 


