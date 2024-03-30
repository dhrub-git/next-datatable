import prisma from "@/lib/prisma";
import { create } from "domain";


/* First Method to create the project dispute */

export async function createPayment (pymnt: any) {

         console.log("<<<<>>>"+pymnt.typeName);
         let newPymt = [] as any;

         switch(pymnt.typeName) {

            case "MILESTONE" : {
                newPymt = await prisma.project_payment_progres.create({
                    data : {
                    
                        createdAt: new Date(),
                        updatedAt: new Date (),
                        createdBy: pymnt.createdBy,
                        updatedBy: pymnt.updatedBy,
                        projectId:Number(pymnt.projectId),
                        payment: pymnt.payment,
                        amount:pymnt.amount,
                        transaction_date:pymnt.transaction_date,
                        transaction_reference:pymnt.transaction_reference,
                        statusId:pymnt.statusId,
                        paymentType: pymnt.typeId,
                        payment_milestone: {
                            create : [{
                                createdAt: new Date(),
                                updatedAt: new Date (),
                                createdBy: pymnt.createdBy,
                                updatedBy: pymnt.updatedBy,
                                milestoneId: pymnt.milestoneId

                            }]
                        },
                      
                        }
                      
            
                    });
            }
            case "DISPUTE" : {
                newPymt = await prisma.project_payment_progres.create({
                    data : {
                    
                        createdAt: new Date(),
                        updatedAt: new Date (),
                        createdBy: pymnt.createdBy,
                        updatedBy: pymnt.updatedBy,
                        projectId:Number(pymnt.projectId),
                        payment: pymnt.payment,
                        amount:pymnt.amount,
                        transaction_date:pymnt.transaction_date,
                        transaction_reference:pymnt.transaction_reference,
                        statusId:pymnt.statusId,
                        paymentType: pymnt.typeId,
                        payment_dispute: {
                            create : [{
                                createdAt: new Date(),
                                updatedAt: new Date (),
                                createdBy: pymnt.createdBy,
                                updatedBy: pymnt.updatedBy,
                                disputeId: pymnt.disputeId

                            }]
                        },
                      
                        }
                      
            
                    });

            }
            case "VARIANCE" : {
                newPymt = await prisma.project_payment_progres.create({
                    data : {
                    
                        createdAt: new Date(),
                        updatedAt: new Date (),
                        createdBy: pymnt.createdBy,
                        updatedBy: pymnt.updatedBy,
                        projectId:Number(pymnt.projectId),
                        payment: pymnt.payment,
                        amount:pymnt.amount,
                        transaction_date:pymnt.transaction_date,
                        transaction_reference:pymnt.transaction_reference,
                        statusId:pymnt.statusId,
                        paymentType: pymnt.typeId,
                        payment_variance: {
                            create : [{
                                createdAt: new Date(),
                                updatedAt: new Date (),
                                createdBy: pymnt.createdBy,
                                updatedBy: pymnt.updatedBy,
                                varainceId: pymnt.varainceId

                            }]
                        },
                      
                        }
                      
            
                    });

            }
         }

         return newPymt;

    }


    export async function  getAllPayments() {
        console.log("insidle lib data")
        const payments = await prisma.project_payment_progres.findMany( {
            include: {project:true}
        } );
        return payments;
    
    }