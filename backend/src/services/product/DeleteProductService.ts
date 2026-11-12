import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps{
    product_id: string;
}

class DeleteProductService{
    async execute({ product_id}:DeleteProductServiceProps){
        try{
            await prismaClient.product.update({
                where:{
                    id:product_id,
                },
                data:{
                    disable:true,
                }
            })

            return {message:"Sucesso ao deletar"}
        }catch(err){
            console.log(err)
        throw new Error("Falha ao deletar o produto")
    }
    }
}

export {DeleteProductService}