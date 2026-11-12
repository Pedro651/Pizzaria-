//CADASTRO DE USUÁRIO
import prismaClient from "../../prisma/index"
import {hash} from "bcryptjs"
interface CreateUserProps{
    name: string;
    email: string;
    password: string;


}

class CreateUSerService{
    async execute({name,email,password}:CreateUserProps){
        
        //Pega o email e fazer uma verificação se ele ja existe
        const findUser = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        //Verificação do email 
        if(findUser){
            throw new Error("Usuário ja existente")
        }

        
        
        const passswordHash = await hash(password, 8)/*
        passswordHash: Vai guardar a criptografia da senha 
        passaword: É a senha que o usuário digitou
        8:Nivel de segurança -> Quanto maior o nivel mais dificil é:
        8  -> rápido
        10 -> mais usado
        12 -> mais seguro
        */

    //Cadastrar usuário
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                //Depois passa pra senha a criptografia
                password: passswordHash,
            },
            //Oq vc quer que retorne depois de cadastrar o usuário
            //Você envia os dados do usuário para o frontend, mas não envia a senha. Isso aumenta a segurança.
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true,
            },
        })
         
        //Aqui ele retorna os dados pra você acesssa-las mas pra poder acessar você pega da class do arquivo
        return user.name;

    }
}

export { CreateUSerService }