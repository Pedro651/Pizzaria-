import {Request, Response, NextFunction} from "express"
import prismaClient from "../prisma/index";

export const isAdmin = async (req:Request, res:Response, next:NextFunction):Promise<void> =>{

    //user_id:ID do usuário que está logado
    const user_id = req.user_id;

    //Se não tiver ele logado da error
    if(!user_id){
        res.status(401).json({
            error:"Usuário sem permissão"
        });
    }

    //Faz uma consulta no banco para confirmar que o usuário realmente existe
    const user = await prismaClient.user.findFirst({
        where:{
            id:user_id
        }
    })

    //Verificação
    if(!user){
        res.status(401).json({
            error:"Usuário sem permissão"
        });
        return
    }
    //Mas qual o sentido de verifica o se tem usuário no banco e logado?
    //Faz sentido porque ter um token válido não garante que o usuário ainda exista no banco.

    //Verifica se o usuário é admin, se n é ele da um error
    if(user.role !== "ADMIN"){
        res.status(401).json({
            error:"Usuário sem permissão"
        });
        return
    }

    //Usuário é admin então segue normal
    next()
}