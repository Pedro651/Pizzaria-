"use server"
import { apiClient } from "@/lib/api";
import { setToken,removeToken } from "@/lib/auth";
import { AuthResponse } from "@/lib/types";
import { redirect } from "next/navigation";

 //Vai ser executado no servidor 

export async function registerAction(
    prevState:{success:boolean; error:string, redirectTo?: string} | null,
    //success: Apenas uma propriedade para indicar se a ação deu certo ou deu errado.
    formData: FormData
    // formData:
    // → dados enviados pelo <form>
    
    // prevState:
    // → guarda o resultado da execução anterior da action
){

   try{
   const name = formData.get("name") as string
   const email = formData.get("email") as string
   const password = formData.get("password") as string

   const data = {
    name: name,
    email:email,
    password:password,
   }
   await apiClient("/users",{
    method:"POST",
    body:JSON.stringify(data)
   })

   // Se deu certo, retorna sucesso e a rota para redirecionar
   //successs:true ->cadastro deu certo.
   return{success: true, error: "", redirectTo: "/Login"}
   }catch(error){
      // Se a API retornou um erro conhecido
      if(error instanceof Error){
         return{ success: false, error: error.message}
         //successs:false ->cadastro deu errado.
      }

      // Erro genérico
      return { success: false, error:"Erro ao criar conta"};
      //successs:false ->cadastro deu errado.
     
   }


}


export async function loginAction(
   prevState:{success:boolean; error:string, redirectTo?: string} | null,
    formData: FormData
){
  
   try{
   const email = formData.get("email") as string
   const password = formData.get("password") as string

   const data = {
      email: email,
      password:password
   }
   
   const response = await apiClient<AuthResponse>("/session",{
      method: "POST",
      body: JSON.stringify(data)
   })

   await setToken(response.token)

   return{success: true ,error:"", redirectTo:"/dashboard"}
   }catch(error ){
      if(error instanceof Error){
         return {success: false, error: error.message || " Erro ao fazer o login"}
      }

      return {success: false, error:"Erro ao fazer o login"}

   }

}

export async function logoutAction(){
   await removeToken();

   redirect("/login")
}