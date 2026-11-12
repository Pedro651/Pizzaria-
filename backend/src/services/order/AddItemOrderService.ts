import prismaClient from "../../prisma";

interface ItemProps{
    order_id: string;
    product_id:string;
    amount: number;
}

class AddItemOrderService{
    async execute({order_id,product_id,amount}:ItemProps){

        try{
            //FindFirst: Busca no banco se existe alguma order
            const orderExists = await prismaClient.order.findFirst({
                where:{
                    id:order_id,
                }
            })
            if(!orderExists){
                throw new Error("Order não encontrada")
            }

            const productExist = await prismaClient.product.findFirst({
                where:{
                    id:product_id
                }
            })
             if(!productExist){
                throw new Error("Product não encontrado")
            }

            //Add item na order
            const item = await prismaClient.item.create({
                data:{
                    order_id:order_id,
                    product_id:product_id,
                    amount:amount
                },select:{
                    id:true,
                    amount:true ,
                    order_id:true,
                    product_id:true,
                    createdAt:true,
                    product:{
                        select:{
                            id:true,
                            name:true,
                            price:true,
                            description:true,
                            banner:true,
                        }
                    }
                }
            })

            return item;
        }catch(err){
            console.log(err)
            throw new Error("Falha ao adicionar item no pedido")
        }

    }
}

export { AddItemOrderService}