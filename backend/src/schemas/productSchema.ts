import { z } from "zod"

export const createProductSchema = z.object({
    body:z.object({
        name:z.string().min(1,{message:"O nome do produto é obrigatório"}),
        price:z.string().min(1,{message:"O valor do produto é obrigatório"}).regex(/^\d+$/),
        description: z.string().min(1,{message:"A descrição é obrigatória"}),
        category_id: z.string().min(1,{message:"A categoria é obrigatória"}),
    })
});


export const ListProductSchema = z.object({
    query: z.object({
        disable:z
        //Ele pode ser true or false(recebe como texto)
        .enum(["true", "false"],{
            message:"O parâmetro disabled deve ser 'true' ou 'false'",
        })
        //É opicional
        .optional()
        //Ele começa como false
        .default("false")
        //Aqui ele pega os textos do enum e transforma em boolean
        .transform((val)=> val === "true")
    }),
});


export const listProductByCategorySchema = z.object({
    query: z.object({
        category_id:z
        .string({message:"O ID da categoria é obrigatória"})
    })
})