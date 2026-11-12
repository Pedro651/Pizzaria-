import prismaClient from "../../prisma/index";



interface CreateOrderServiceProps{
    name?: string,
    table: number,
}

class CreateOrderService{
    async execute({name,table}:CreateOrderServiceProps){

        try{
            const order = await prismaClient.order.create({
                data:{
                    name:name ?? "",
                    table:table
                },select:{
                    id:true,
                    table:true,
                    status:true,
                    draft:true,
                    name:true,
                    createdAt:true,
                }
            })
            return order
        }catch(err){
             console.log("ERRO COMPLETO:", err)
             throw err
        }
    }
}

export {CreateOrderService}