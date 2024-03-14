import prisma from "@/lib/prisma";


/* First Method to create the project dispute */

export async function createProjectFile (file: any) {

    const dispute =  await prisma.project_file.create({
        data : {
        
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: file.createdBy,
            updatedBy: file.updatedBy,
            projectId:Number(file.projectId),
            file_name: file.file_name,
            tag:file.tag,
            released_date:file.released_date,
            milestone:file.milestone,
            relates_to:file.relates_to,
            third_party:file.third_party,
            uploaded_by:file.uploaded_by

            }
          

        });

        return dispute;
    }


    export async function  getAllFiles() {
        console.log("insidle lib data")
        const builders = await prisma.project_file.findMany( {
            include: {project:true}
        } );
        return builders;
    
    }