//Buscar todos os produtos de uma categoria

import prismaClient from "../../prisma"

interface ListProductByCategoryServiceProps{
    category_id:string
}
class ListProductByCategoryService{

    async execute({category_id}:ListProductByCategoryServiceProps){
        try{
            //Verifica se a categoria existe
            const category = await prismaClient.category.findUnique({
                where:{
                    id:category_id
                },
            });

            if(!category){
                throw new Error("Não tem essa categoria")
            }

            //Buscar produtos da categoria
            const product= await prismaClient.product.findMany({
                
                where:{
                    category_id:category_id,
                    //Vai buscar os produtos ativos
                    disable:false
                },
                select:{
                    id:true,
                    name:true,
                    price:true,
                    description:true,
                    banner:true,
                    disable:true,
                    category_id:true,
                    createdAt:true,
                    category:{
                        select:{
                            id:true,
                            name:true,
                        },
                    },
                },
                orderBy:{
                    createdAt:"desc"
                },
            })
            return product;
        }catch(err){
           if(err instanceof Error) {
            throw new Error(err.message)
           }
           throw new Error("Falha ao buscar produto da categoria")
        }
       


    }
}

export {ListProductByCategoryService}