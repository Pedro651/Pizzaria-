import api from "@/services/api";
import { LoginResponse, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderProps{
    children: React.ReactNode
}

interface AuthContextData{
    user: User | null;
    signed:boolean;
    loading: boolean;
    signIn: (email:string, password:string) => Promise<void>;
    signOut: () => Promise<void>;


}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children} : AuthProviderProps){

    const [signed, setSigned] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(()=>{
        async function loadData(){
            await loadStorageDAta();
        }
        loadData()

    },[])

    //Para o usuário continua logado e não precisa digitar e-mail e senha novamente.
    async function loadStorageDAta(){

        try{
            setLoading(true)
            //Buscar o valor salvo dentro do @token:pizzaria e no @user:pizzaria
            const storedToken = await AsyncStorage.getItem("@token:pizzaria")
            const storedUser = await AsyncStorage.getItem("@user:pizzaria")

            //Se tiver ele passa o detalhe do usuário logado
            if(storedToken && storedUser){
                //Transforma em objeto e passa pro setUser
                setUser(JSON.parse(storedUser))
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }



    async function signIn(email:string, password:string){
        try{
            //O reponse vai ser do tipo LoginResponse: Com isso a gente vai poder usar as info do usuário(props)
            const response =await api.post<LoginResponse>("/session" , {
                email:email,
                password:password
            })

            const{ token, ...userData} =response.data;
            //Pega so o token e o resto deixa na userData(é os dados do usuário)
             

            //Salva o token 
            await AsyncStorage.setItem("@token:pizzaria", token)
            //Salva os dados do usuário
            await AsyncStorage.setItem("@user:pizzaria", JSON.stringify(userData))
            
            
            
            console.log(response.data)
            /*
            data: dentro do data vai ta as info do usuário(o email,senha...)
            |Quando ele retornar as info do usuário a gente tem tipar elas pra poder pega-las
            */

            setUser(userData)
        }catch(err){
            console.log(err)
        }
    }

    //Deslogar da conta
    async function signOut() {
        //Remove do AsyncStorage o token e os dados do usuário
        await AsyncStorage.removeItem("@token:pizzaria")
        await AsyncStorage.removeItem("@user:pizzaria")
        setUser(null)
    }


    return(
        <AuthContext 
        value={{
            //Se tiver algo dentro do user o signed fica true se ñ tiver fica false
            //Se você coloca !! antes da prop, vc transforma em boolean
            //Verifica se tem usuário logado ou não a prop signed
            signed: !!user,
            loading,
            signIn,
            user,
            signOut
        }}
        >
            {children}
        </AuthContext>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("Contexto não foi encontrado!")
    }

    return context
}