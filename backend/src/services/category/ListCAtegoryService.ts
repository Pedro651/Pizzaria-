//Buscar todas as categorias cadastradas no banco de dados

import prismaClient from "../../prisma/index";


class ListCategoryService{
    async execute(){

        try{
        const category = await prismaClient.category.findMany({
            //Select: Serve para pegar as info dessas props
            select:{
                id: true,
                name:true,
                createdAt:true
            },orderBy:{
                //Ordem descrecente
                createdAt:"desc"
            }
            
        });
        return category;
    }catch(err){
        throw new Error("Falha ao cadastrar")
    }
    }

}

export { ListCategoryService }