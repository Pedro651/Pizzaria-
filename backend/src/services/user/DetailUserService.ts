//BUSCANDO DADOS DO USUÁRIO
import prismaClient from "../../prisma/index"




class DetailUserService{
    async execute(user_id:string ){

        //Aqui ele pega o id do usuário
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id,
            },select:{
                id: true,
                name:true,
                email:true,
                role:true,
                createdAt:true,

            }
        })
        if(!user){
            throw new Error("Usuário não encontrado")
        }
       
        return user;
    }
}

export {DetailUserService}