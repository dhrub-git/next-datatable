import prisma from "@/lib/prisma";


/* First Method to create the project variance */

export async function createVariance (vrince: any, dispute: boolean) {

    let newVrnce=[] as any;
    if (dispute) {
        newVrnce =  await prisma.variance.create({
        data : {
            
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: vrince.createdBy,
            updatedBy: vrince.updatedBy,
            change: vrince.change,
            milestoneId:Number(vrince.milestoneId),
            statusId:vrince.statusId,
            varianceType:vrince.varianceType,
          
            dispute_variance: {
                create : [ {
                    createdAt: new Date(),
                    updatedAt: new Date (),
                    createdBy:vrince.createdBy,
                    updatedBy: vrince.updatedBy,
                    disputeId: vrince.disputeId,
                   
                }
            ]
    
            },
           
         
            }
        })
    } else {
        newVrnce =  await prisma.variance.create({
            data : {
                
                createdAt: new Date(),
                updatedAt: new Date (),
                createdBy: vrince.createdBy,
                updatedBy: vrince.updatedBy,
                change: vrince.change,
                milestoneId:Number(vrince.milestoneId),
                statusId:vrince.statusId,
                varianceType:vrince.varianceType
               
             
                }
            })

    }
     return newVrnce;
    }


    export async function  getAllMilestone() {
        console.log("insidle lib data")
        const builders = await prisma.project_milestone.findMany( {
            include: {project:true}
        } );
        return builders;
    
    }