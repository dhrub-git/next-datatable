
import { createProject } from "@/lib/data/project";
import { NextResponse } from "next/server";


/* POST Method to create a project */

export async function POST(request: Request) {

    try {

        console.log("inside the post method -- create project");
        const project = await request.json();
      
        
        project.createdBy="admin123";
        project.updatedBy="admin123";
        project.builderId=1;
        project.statusId=1;
        project.managed_by_id=1;
      //  project.projectvalue=50000;
        console.log("project POST 1>>>"+JSON.stringify(project));
       const newProject  = await createProject(project);
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        return NextResponse.json({message: "Project Created Succesfully", newProject}, {status: 200,})
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating Customer", err},
            {status: 500,}
    
        )}

  

    };





   
   
   
 


