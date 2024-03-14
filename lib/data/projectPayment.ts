import prisma from "@/lib/prisma";


/* First Method to create the project dispute */

export async function createPayment (payment: any) {

    const dispute =  await prisma.project_payment_progres.create({
        data : {
        
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: payment.createdBy,
            updatedBy: payment.updatedBy,
            projectId:Number(payment.projectId),
            payment: payment.payment,
            amount:payment.amount,
            transaction_date:payment.transaction_date,
            transaction_reference:payment.transaction_reference,
           
            statusId:payment.statusId,
          
            }
          

        });

        return dispute;
    }


    export async function  getAllPayments() {
        console.log("insidle lib data")
        const payments = await prisma.project_payment_progres.findMany( {
            include: {project:true}
        } );
        return payments;
    
    }