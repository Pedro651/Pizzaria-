"use server";

import { getToken } from "@/lib/auth"
import { apiClient } from "@/lib/api"
import { Category } from "@/lib/types"
import { revalidatePath } from "next/cache"

//o Next.js pega todos os campos do formulário e envia para a função dentro de um objeto FormData
export async function createCategoryAction(formData: FormData) {
  try{
    const token =await getToken()
    const name = formData.get("name");

    if(!token){
      return { success:false, error:"Erro ao criar categoria"}
    }

    const data = {
      name:name
    }

    await apiClient<Category>("/category",{
      method:"POST",
      body:JSON.stringify(data),
      token:token 

    })
    console.log(name)

    //Atualizar a página para mostrar novas categorias criadas
    //Passa o caminho da página q quer atualizar(revalidar)
    revalidatePath("/dashboard/categories")

    


    return { success:true, error:""}
  }catch(error){
    if(error instanceof Error){
      return {success:false, message:error.message}
    }
     return {success:false, message:"Error ao criar categoria"}

  }
}