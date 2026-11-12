import prismaClient from "../../prisma";

interface itemOrderProps{
    item_id: string;
}

class RemoverItemOrderService{
    async execute({item_id}:itemOrderProps){
        try{
        //É opcional colocar isso:
        const itemExist = await prismaClient.item.findFirst({
            where:{
                id:item_id
            }
        })

        if(!itemExist){
            throw new Error("Item não encontrado")
        }


       
        const itemOrder = await prismaClient.item.delete({
            where:{
                id:item_id,
            },
        });

        return{message:"Removido com sucesso "}

    }catch(err){
        console.log(err)
        throw new Error("Falha ao remover o item do pedido")

    }





    }

}

export { RemoverItemOrderService }