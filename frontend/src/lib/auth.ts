//O cookies fica aqui pq vai ser usado em várias aplicações, pra n ficar repetindo o codigo é so pegar daqui
import { apiClient} from "@/lib/api"
import {redirect} from "next/navigation"
import { User } from "./types";
import { cookies } from "next/headers"
/*
Cookie:pequena informação salva no navegador para manter o usuário identificado ou lembrar preferências
O que pode ter dentro dela?
-Token e qualquer outra coisa que vc deseja colocar
*/

//O nome do cookie que vai ser usado no sistema:
const COOKIE_NAME = "token_pizzaria"

//Buscar token:
export async function getToken(): Promise<string | undefined>{
    const cookieStore = await cookies();
    // pega\acessa todos os nossos cookies  
    return cookieStore.get(COOKIE_NAME)?.value
    // procura um cookie específico (COOKIE_NAME)
    // se existir, retorna o valor dele (token)
    // se não existir, retorna undefined

}

//Salvar Token
export async function setToken(token:string){
    const cookieStore = await cookies();
    //Passa a chave(identificador) e o valor q vc quer salvar e passar as props
    cookieStore.set(COOKIE_NAME,token,{
        //So consegue pegar os cookies no lado HTTP(mais seguro)
        httpOnly:true,
        //O tempo que ele vai expirar
        maxAge:60 * 60 * 24 * 30, // = 30 dias
        //Ele vai aceitar em todos os caminhos
        path:'/',
        sameSite:true,
        secure: process.env.NODE_ENV === "production"

    })


}

//Remover token
export async function removeToken(){
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME)

}

//Chamar ela pra quando pegar o detalhes do usuário e serve pra ve se tem usuário logado
export async function getUser(): Promise<User | null>{
    try{
        const token = await getToken();

        if(!token){
            return null
        }

        const user = await apiClient<User>("/me",{
            token:token,
        })

        return user;

    }catch(err){
        console.log(err)
        return null

    }
}


export async function requireAdmin(): Promise<User>{
   const user = await getUser();

   if(!user){
    redirect("/login")
   }

   if(user?.role !== "ADMIN"){
    redirect("/access-denied")
   }
   return user!;
}