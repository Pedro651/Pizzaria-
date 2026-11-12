import { z } from "zod"

export const createOrderSchema = z.object({
   body: z.object({
    table:z.number({ message:"O número da mesa é obrigatório"})
    .int({message: "O número da mesa deve ser um número inteiro"})
    .positive({message:"O número da mesa deve ser um número positivo"}),
    name:z.string().optional(),
    
})  
})

export const addItemSchema = z.object({
    body:z.object({
        order_id: z.string({message:"Order deve ser uma string "}).min(1,"A order_id deve ser obrigatória"),
        amount: z.number().int("Quantidade deve ser um numero innteiro").positive("Quantidade deve ser um numero positivo"),
        product_id: z.string({message:"Product deve ser uma string "}).min(1,"O product deve ser obrigatória")
        
    })
})

export const removeItemOrderSchema = z.object({
    query:z.object({
        item_id:z
        .string({message:"Item ID deve ser uma string"})
        .min(1,"item é obrigatório"),
    })
})

export const detailOrderSchema = z.object({
    query: z.object({
        order_id:z
        .string({message:"Order ID deve ser uma string"})
        .min(1,"O order_id é obrigatório")
    })
})


export const sendOrderSchema = z.object({
    body: z.object({
        order_id:z.string({message:"ID do pedido precisa ser uma string"}),
        name: z.string({message:"O nome precisa ser um texto"})
    })
})

export const finishOrderSchema = z.object({
    body: z.object({
        order_id:z.string({message:"ID do pedido precisa ser uma string"}),
        
    })
})

export const deleteOrderSchema = z.object({
    query:z.object({
        order_id:z.string({message:"ID do pedido precisa ser uma string"}),
    })
})
/*
QUANDO VOCÊ USA BODY E QUERY NO SCHEMA?

body → para enviar dados

Quando você está criando ou atualizando algo.

POST, PATCH e PUT 
-----------------------------------------------------------------

query → para filtros e opções

Quando você quer buscar, deletar, filtrar ou configurar uma consulta.

GET e DELETE
*/

