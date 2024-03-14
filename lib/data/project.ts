import prisma from "@/lib/prisma";


/* First Method to create the project */

export async function createProject (project: any) {

    const newProject =  await prisma.project.create({
        data : {
          //  id: 3,
            statusId:project.statusId,
            builderId: project.builderId,
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: project.createdBy,
            updatedBy: project.updatedBy,
            project_name: project.projectname,
            project_value: Number(project.projectvalue),
            managed_by_id: project.managed_by_id,
            project_end_date: project.estimatedenddate,
            project_contract_details: project.contract,
            address_line_1: project.addressline1,
            address_line_2: project.addressline2,
            city:project.city,
            state:project.state,
            postcode:project.zip,
            customer_project : {
                create:[
                    {
                        createdAt: new Date(),
                        updatedAt: new Date (),
                        createdBy: project.createdBy,
                        updatedBy: project.updatedBy,
                        customerId: Number(project.customername),
                    
                    }
                ]


            }
          

        }
    });
    return newProject;


}

export async function  getProjectData(projId: Number) {
    console.log("insidle lib data"+projId)
    const proj = await prisma.project.findMany ({
        where : { id: Number(projId)},
        include: {
            project_disputes:true,
            project_files:true,
            project_milestone:true,
            project_payment_progres: true
        }
    })
   
    return proj;
}

