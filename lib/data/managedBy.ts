import prisma from "@/lib/prisma";


export async function  getAllManagedStaff() {
    console.log("Get All Builder Managed Staffs")
    const bdrStaffs = await prisma.managed_by.findMany();
    return bdrStaffs;
}

export async function  getManagedStaff(id: Number) {
    console.log("Get All Builder Individual Managed Staff data"+id)
    const bdrStaffData = await prisma.managed_by.findUnique(
        {
            where : { id: Number(id)}
        }
    );
   
    return bdrStaffData;
}

//export async function createBuilder (firstName: any , lastName: any , email: any , mobile:any) {

export async function createManagedStaff (staff: any) {

    const newBdrStaff =  await prisma.managed_by.create({
        data : {
          //  id: 3,
            builderId: staff.builderId,
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: staff.createdBy,
            updatedBy: staff.updatedBy,
            first_name: staff.firstName,
            last_name: staff.lastName,
            email: staff.email,
            mobile: staff.mobile,

        }
    });
    return newBdrStaff;


}

export async function updateManagedStaff (bdrStaff: any) {

   // console.log("insidle lib create data"+firstName, lastName, email, mobile)

    const updateBdrStaff =  await prisma.managed_by.update({
        
            where : {
                 id: Number(bdrStaff.id)
        },

        data : {
          //  id: Number(id),
            //createdAt: new Date(),
            builderId: bdrStaff.builderId,
            updatedAt: new Date (),
           // createdBy: 'admin2',
           updatedBy: bdrStaff.updatedBy,
           first_name: bdrStaff.firstName,
           last_name: bdrStaff.lastName,
           email: bdrStaff.email,
           mobile: bdrStaff.mobile,
        }
    });
    return updateBdrStaff;
    }

    export async function  deleteManagedStaff(id: Number) {
        console.log("insidle lib delete"+id)
        const del = await prisma.managed_by.delete(
            {
                where : { id: Number(id)}
            }
        );
       
        return del;
    }