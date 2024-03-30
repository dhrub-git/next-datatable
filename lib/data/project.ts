import prisma from "@/lib/prisma";


/* First Method to create the project */

export async function createProject (project: any, milstCtgry: any) {
    console.log("inside project create");

    const newProject =  await prisma.project.create({
        data : {
          //  id: 3,
            statusId:project.statusId,
            builderId: project.builderId,
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: project.createdBy,
            updatedBy: project.updatedBy,
            project_name: project.project_name,
            project_value: Number(project.project_value),
            managed_by_id: project.managed_by_id,
            project_end_date: project.project_end_date,
            project_contract_details: project.project_contract_details,
            address_line_1: project.address_line_1,
            address_line_2: project.address_line_2,
            city:project.city,
            state:project.state,
            postcode:project.postcode,
            customerId:Number(project.customerId),

            project_milestone :{

                create:milstCtgry
            }
          

        }
    });
    return newProject;


}

/*  Methd to update the project >>>*/
export async function updateProject (project: any) {
    console.log("inside project update");

    const updProj =  await prisma.project.update({

        where : {
            id: project.projectId
        },

        data : {
          //  id: 3,
            statusId:project.statusId,
            builderId: project.builderId,
            updatedAt: new Date (),
            updatedBy: project.updatedBy,
            project_name: project.project_name,
            project_value: Number(project.project_value),
            managed_by_id: project.managed_by_id,
            project_end_date: project.project_end_date,
            project_contract_details: project.project_contract_details,
            address_line_1: project.address_line_1,
            address_line_2: project.address_line_2,
            city:project.city,
            state:project.state,
            postcode:project.postcode,
            customerId:Number(project.customerId),

          
          

        }
    });
    return updProj;


}
export async function  getMilestoneCategory() {

    const milestoneCtgry = await prisma.milestone_category.findMany ();
    return milestoneCtgry;

}

export async function  getProjectData(projId: Number) {
    console.log("insidle lib data"+projId)
    const proj = await prisma.project.findUnique ({
        where : { id: Number(projId)},
        include: {
            project_disputes:true,
            project_files:true,
            project_milestone:{
                include: {
                    milestone_category: true,
                    status:true,
                }
            },
            project_payment_progres: true
        }
    })
   
    return proj;
}

