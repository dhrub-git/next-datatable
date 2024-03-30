import prisma from "@/lib/prisma";


/* First Method to create the project dispute */

export async function createProjectDispute (pjtDispute: any) {

    const dispute =  await prisma.project_disputes.create({
        data : {
        
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: pjtDispute.createdBy,
            updatedBy: pjtDispute.updatedBy,
            projectId:Number(pjtDispute.project),
            dispute_milestone: pjtDispute.milestone,
            dispute_category:pjtDispute.category,
            dispute_details:pjtDispute.details,
            released_date:pjtDispute.releasedDate,
            file:pjtDispute.file,
            variation_amount:pjtDispute.amount,
            milestoneId: pjtDispute.milestoneId? pjtDispute.milestoneId: null

            }
          

        });

        return dispute;
    }


    export async function  getAllDisputes() {
        console.log("insidle lib data")
        const builders = await prisma.project_disputes.findMany( {
            include: {project:true}
        } );
        return builders;
    
    }