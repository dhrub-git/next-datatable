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

/* Method to return the list of customer for the builder */
export async function  getCustomers(builderId: Number) {
    console.log("Fetching All Customers for the builder Id" + builderId)
    const customers = await prisma.customer.findMany( {
        where : { builderId: Number(builderId)},

        select: {
            id:true,
            customer_name: true,

        }
    })

    return customers;
}

/*  Method to return the dashboard summary */
export async function  getBuilderCustomers(id: Number) {
    console.log("Fetching All Customers for the builder Id" + id)
    const customers = await prisma.customer.findMany( {

        where : { builderId: Number(id)},

        select: {
            id:true,
            customer_name: true,
            address_line_1: true,
            address_line_2: true,
            city:true,
            state:true,
            postcode:true,
          
             updatedAt: true,
             customer_status: {
                select: {
                    id: true,
                    name: true
                }
             },   
            customer_project : {
            
                select: {
                
                    project: {
                    
                        select: {
                        
                            id: true,
                            project_value: true,
                            project_name: true
                        }
                    }
                }
            },
            managed_by: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                }
            }


        },
        
        
        
      } );

      return customers;
}