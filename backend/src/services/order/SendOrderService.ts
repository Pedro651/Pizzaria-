import prismaClient from "../../prisma";


interface SendOrderProps{
    name:string;
    order_id:string;

}

class SendOrderService {
    async execute({name,order_id}:SendOrderProps){
        try{
            const order = await prismaClient.order.findFirst({
                where:{
                    id: order_id
                }
            })

            if(!order){
                throw new Error("Falha ao enviar pedio")
            }

            //Atualiza a propriedade draft para false(enviar para cozinha)

            const updateOrder = await prismaClient.order.update({
                where:{
                    id:order_id,
                },
                data:{
                    draft:false,
                    name:name
                },select:{
                    id:true,
                    name:true,
                    table:true,
                    draft:true,
                    status: true,
                    createdAt:true,
                }
            })

            return updateOrder;



        }catch(err){
            console.log(err)
            throw new Error("Falha ao enviar pedio")
        }
    }
}

export {SendOrderService}