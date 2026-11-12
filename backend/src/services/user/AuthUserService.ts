//LOGIN DE USUÁRIO

import { compare } from "bcryptjs";
import prismaClient from "../../prisma/index";
import { sign } from 'jsonwebtoken';

interface AuthUserServiceProps{
    email:string;
    password: string;
}

class AuthUserService{
    async execute({ email, password}:AuthUserServiceProps ){
      
        //Vê se tem esse email no banco e se tiver fica na variavel user
        const user = await prismaClient.user.findFirst({
            where:{
                email: email,
            }
        })

        //Se não tiver o email manda um error
        if(!user){
            throw new Error("É obrigatório")
        }


        

        //Verificar se a senha está correta
        //compare: Vai comparar com a senha q o usuário mandou com a senha codificada que está no banco
        const passwordMatch = await compare(password,user.password)

        //Se a senha que o usuário mandou não for igual ele manda o error
        if(!passwordMatch){
            throw new Error("É obrigatório") 
        }


        //GERAR TOKEN JWT: Token gera sozinho quando o usuário entra na conta dele, isso ai faz gera-lo
        const token = sign({
            // Informações que ficarão dentro do JWT
            // e poderão ser lidas depois(NÂO É bom colocar cpf, senha pq n é criptografado)
            name:user.name,
            email:user.email,
        }, 
        // CHAVE SECRETA:
        // Usada para assinar o token e garantir que ninguém altere seu conteúdo
        // Sem a chave ,alguém poderia pegar o token e alterar
        process.env.JWT_SECRET as string,{
            //O subject serve para identificar quem é o dono do token
            subject:user.id,
            // TEMPO DE EXPIRAÇÃO
            // Após 30 dias o token deixa de ser válido
            expiresIn:"30d"
        })

        //Ele devolve pro controller e ele recebe e passa pro usuário
        return{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:token,
        }
    }
}

export{AuthUserService}