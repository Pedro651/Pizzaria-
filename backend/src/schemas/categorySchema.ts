import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name:z.string({message: "categoria precisa ser um texto"})
        .min(2,{message:"Precisar ter 2 caracteres"})
    })
})