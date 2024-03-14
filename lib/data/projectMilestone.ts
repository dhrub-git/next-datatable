import prisma from "@/lib/prisma";


/* First Method to create the project dispute */

export async function createMilestone (milestone: any) {

    const dispute =  await prisma.project_milestone.create({
        data : {
        
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: milestone.createdBy,
            updatedBy: milestone.updatedBy,
            projectId:Number(milestone.projectId),
            contract_milestone: milestone.contract_milestone,
            payment_progress:milestone.payment_progress,
            actual_date:milestone.actual_date,
            milestone_amount:milestone.milestone_amount,
            milestone_cumulative:milestone.milestone_cumulative,
            statusId:milestone.statusId,
          
            }
          

        });

        return dispute;
    }


    export async function  getAllMilestone() {
        console.log("insidle lib data")
        const builders = await prisma.project_milestone.findMany( {
            include: {project:true}
        } );
        return builders;
    
    }