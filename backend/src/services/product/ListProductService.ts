import prismaClient from "../../prisma";

interface ListProductServiceProps{
    disable?:string,
}

class ListProductService{
    async execute({disable}:ListProductServiceProps){
        try{
            const products = await prismaClient.product.findMany({
                where:{
                    disable:disable === "true" ? true: false
                },select:{
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
                            name:true
                        },
                    },
                },
                orderBy:{
                    createdAt:"desc",
                }
            });
            return products;
    } catch(err){
        throw new Error("Falha ao buscar produtos")
    }
}
}

export { ListProductService }
