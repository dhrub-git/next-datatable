
import { createProject, getMilestoneCategory, updateProject } from "@/lib/data/project";
import { log } from "console";
import { NextResponse } from "next/server";


/* POST Method to create a project */

export async function POST(request: Request) {

    try {

      
        const rqstBody = await request.json();
        console.log("inside the post method -- create project"+rqstBody.projectId);
        if (rqstBody.projectId!=null) {
            console.log("project update  1>>>"+JSON.stringify(rqstBody.projectId));
            const project:any ={
               
                updatedBy:"admin123",
                projectId:rqstBody.projectId,
                statusId:rqstBody.statusId,
                builderId:rqstBody.builderId,
                managed_by_id:rqstBody.managed_by_id,
                project_name:rqstBody.submitData.projectname,
                project_value: rqstBody.submitData.projectvalue,
                project_end_date: rqstBody.submitData.estimatedenddate,
                project_contract_details: rqstBody.submitData.contract,
                address_line_1: rqstBody.submitData.addressline1,
                address_line_2: rqstBody.submitData.addressline2,
                city:rqstBody.submitData.city,
                state:rqstBody.submitData.state,
                postcode:rqstBody.submitData.zip,
                customerId:Number(rqstBody.submitData.customername),
                
            };
            const updPrject  = await updateProject(project);
            return NextResponse.json({message: "Project Updated Succesfully", updPrject}, {status: 200,})
        } else {
            console.log("project new  1>>>"+JSON.stringify(rqstBody.submitData));

            const project:any ={
                createdBy:"admin123",
                updatedBy:"admin123",
                statusId:1,
                builderId:1,
                managed_by_id:2,
                project_name:rqstBody.submitData.projectname,
                project_value: rqstBody.submitData.projectvalue,
                project_end_date: rqstBody.submitData.estimatedenddate,
                project_contract_details: rqstBody.submitData.contract,
                address_line_1: rqstBody.submitData.addressline1,
                address_line_2: rqstBody.submitData.addressline2,
                city:rqstBody.submitData.city,
                state:rqstBody.submitData.state,
                postcode:rqstBody.submitData.zip,
                customerId:Number(rqstBody.submitData.customername),
                
            };

            console.log("project new  2>>>"+JSON.stringify(project));
            const milstCtgry = [];
    
            const milestCtgry = await getMilestoneCategory();
          
            milestCtgry.map(ctgry => {
               // console.log("ctrgy>>>"+ctgry.id);
                const tmp = {
                    createdAt: new Date(),
                    updatedAt: new Date (),
                    createdBy: project.createdBy,
                    updatedBy: project.updatedBy,
                    milestone_categoryId: ctgry.id,
                    payment_progress: "In progress",
                    actual_date: project.project_end_date,
                    milestone_amount: String(project.project_value),
                    milestone_cumulative: String(project.project_value),
                    statusId:1,
    
    
                };
                milstCtgry.push(tmp);
            })
           
        const newProject  = await createProject(project, milstCtgry);
        return NextResponse.json({message: "Project Created Succesfully", newProject}, {status: 200,})
        }
      
       // return NextResponse.json({"status":200,{message:"Project Created Succesfully"}});

        
    
      
    }catch (err) {
        console.log("POST Error"+err)
        return NextResponse.json(
            {message: "Error While creating Customer", err},
            {status: 500,}
    
        )}

  

    };





   
   
   
 


