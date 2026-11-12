// Middleware de validação automática das requisições usando Zod
import { NextFunction ,Request, Response} from "express"
import { ZodType, ZodError } from "zod"

export const validateSchema = 
// Recebe um schema do Zod
  (schema:ZodType) => 
    async(req: Request, res: Response, next:NextFunction)=>{
     try{
      // Valida os dados da requisição
      /*parseAsync() -->então quer dizer que essa parte ela pega os dados que o usuário enviou e 
      compara com as regras do zod*/
       await schema.parseAsync({
        //Comparando
        body:req.body, //Dados que o usuário envia
        query: req.query, // Filtros da URL(query pega a lista)
        params:req.params,//Dados da rota (params pega um item específico)
       })
      // Se a validação passou, continua para o próximo middleware/controller
       return next();

     }catch(error){
        // Se o erro for do zod entra no if se n for pula
        if(error instanceof ZodError ){
            return res.status(400).json({
                error:"Não foi possivel reconhecer seus dados",
                // Lista todos os erros encontrados
                details: error.issues.map(issue=>({
                    campo:issue.path.slice(1).join("."),
                    mensagem: issue.message
                }))
            })
        }

         // Caso aconteça algum erro inesperado
        return res.status(500).json({
            error:"Erro interno do servidor",
        })


     }
}