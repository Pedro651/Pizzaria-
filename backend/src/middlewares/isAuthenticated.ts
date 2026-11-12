//MIDDLEWARE DE AUTENTICAÇÃO: Ele verifica se o usuário está logado antes de permitir o acesso a uma rota.
import  { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface PayLoad{
    //Id do usuário
   sub: string;
}



export function isAuthenticated(req:Request, res:Response, next:NextFunction){
    
    //Vai pegar o token e colocar dentro da variável(authToken)
    //Aqui a gente pega o token e o nome bears
    const authToken = req.headers.authorization
    //headers:Uma "caixinha" com informações da requisição(req), nela tem o token do usuário...
    

    // Faz a verificação: Se não enviou token, bloqueia o acesso
    if(!authToken){
        return res.status(401).json({
            error:"Token não fornecido"
        })
    }
    
    //Nessa parte ele pega o token(token) e o espaço(" ")
    //A gente coloca esse codigo so pra pegar o token ,pq quando pega o token la em cima ele vem com o nome bears
    const [, token] = authToken.split(" ");

    try{
        // Verifica se o token é válido(verify) e pega o id do usuário (sub)
        //process.env.JWT_SECRET: pega a chave secreta do .env para validar o token.
        const { sub } = verify(token!,process.env.JWT_SECRET as string) as PayLoad
    
        // Salva o id do usuário na requisição pra ser usado no controler ,primeiro aqui e dps vai por controler
        req.user_id = sub;

        return next();
    }catch(err){
       res.status(401).json({
        error:"token invalído"
       })
    }

   

}

