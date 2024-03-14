import prisma from "@/lib/prisma";

/* Method to create builder */

export async function createBuilder (buildr: any) {

    const newBuilder =  await prisma.builder.create({
        data : {
          //  id: 3,
            createdAt: new Date(),
            updatedAt: new Date (),
            createdBy: buildr.createdBy,
            updatedBy: buildr.updatedBy,
            first_name: buildr.firstName,
            last_name: buildr.lastName,
            email: buildr.email,
            mobile: buildr.mobile,

        }
    });
    return newBuilder;


}


/* Second Method to fetch customers/projects summary for the dashboard page */
export async function  getDashboardSummary(id: Number, modelName: String, flag: Boolean) {
   

    if (!flag) {
        console.log("modelname >>>"+modelName);
        const query = `select to_char("createdAt", 'YYYY-MM'), cast(count (*) as numeric),
        sum(count (*))  over()  from ${modelName}
      where "builderId"= ${Number(id)}
      GROUP by  to_char("createdAt", 'YYYY-MM') order by to_char("createdAt", 'YYYY-MM') desc
      limit 2;`
        const summary = await prisma.$queryRawUnsafe(query);
          console.log("getCustomerAverage>>>"+JSON.stringify(summary));
    
          return summary;
    } else {

        console.log("modelname for prject value >>>"+modelName);
        const query = `select to_char("createdAt", 'YYYY-MM'),  cast(sum (project_value) as numeric)
         from ${modelName}
  where "builderId"= ${Number(id)}
  GROUP by  to_char("createdAt", 'YYYY-MM') order by to_char("createdAt", 'YYYY-MM') desc
  limit 2;`
    const summary = await prisma.$queryRawUnsafe(query);
      console.log("getCustomerAverage in the project value>>>"+JSON.stringify(summary));

      return summary;
    }
    
}




/*CURD OPERATIONS */
export async function  getCustomers(id: Number) {
    console.log("insidle lib data"+id)
    const builder = await prisma.customer.findMany ({
        //where : { builderId: Number(id)},
    })
   
    return builder;
}
export async function  getCustomersCount(id: Number) {
    console.log("DB Method to fetch the count of customers for the builder ID"+id)
    const builders = await prisma.builder.findMany( {
      //  include: {//builder_staff:true}
    } );
    return builders;

}




export async function  getAllBuilders() {
    console.log("insidle lib data")
    const builders = await prisma.builder.findMany( {
      //  include: {builder_staff:true}
    } );
    return builders;

}

export async function  getBuilderData(id: Number) {
    console.log("insidle lib data"+id)
    const builder = await prisma.builder.findUnique(
        {
            where : { id: Number(id)},
            include: {
                    customer:true}
        }
    );
   
    return builder;
}

//export async function createBuilder (firstName: any , lastName: any , email: any , mobile:any) {



export async function updateBuilder (buildr: any) {

   // console.log("insidle lib create data"+firstName, lastName, email, mobile)

    const updateBuilder =  await prisma.builder.update({
        
            where : {
                 id: Number(buildr.id)
        },

        data : {
          //  id: Number(id),
            //createdAt: new Date(),
            updatedAt: new Date (),
           // createdBy: 'admin2',
           updatedBy: buildr.updatedBy,
           first_name: buildr.firstName,
           last_name: buildr.lastName,
           email: buildr.email,
           mobile: buildr.mobile,
        }
    });
    return updateBuilder;
    }

    export async function  deleteBuilder(id: Number) {
        console.log("insidle lib delete"+id)
        const del = await prisma.builder.delete(
            {
                where : { id: Number(id)},
                
            }
        );
       
        return del;
    }