import prisma from "@/lib/prisma";


/* First Method to create the customer */

export async function createCustomer (customer: any) {

    const newCustomer =  await prisma.customer.create({
        data : {
          //  id: 3,
            builderId: customer.builderId,
            statusId:customer.statusId,
            managed_by_id: customer.managed_by_id,
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: customer.createdBy,
            updatedBy: customer.updatedBy,
            customer_name: customer.customername,
            email: customer.email,
            address_line_1: customer.addressline1,
            address_line_2: customer.addressline2,
            city:customer.city,
            state:customer.state,
            postcode:customer.zip
          

        }
    });
    return newCustomer;


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