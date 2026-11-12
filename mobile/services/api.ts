//config o axios

import { API_CONTIG } from '@/config/api.config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const api = axios.create({
    baseURL:API_CONTIG.BASE_URL,
    timeout:API_CONTIG.TIMEOUT,
    headers:{
        "Content-Type" : "application/json"
    }
})

/*
CONFIG:
É configurações da requisição 

const config = {
  method: "GET",
  url: "/orders", // <- esta é a rota
  headers: {},
};
*/


//Interceptor: É para add o token em todas as req.
api.interceptors.request.use(
    async(config) => {
        //Pegar o token do usuário: "@token:pizzaria" => "eyJhbGciOiJIUzI1NiIs..."
        const token = await AsyncStorage.getItem("@token:pizzaria")

        // Verifica se encontrou um token
        if(token){
            // O backend vai usar esse token para identificar o usuário
            config.headers.Authorization =`Bearer ${token}`
        }

        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
);

//Interceptar erros
api.interceptors.response.use(
    (response) => response,
    async(error) =>{
        //Se deu error 401 remove o token salvo
        if(error.response?.status == 401){
            //@token:pizzaria: Identificador do token
            await AsyncStorage.removeItem("@token:pizzaria")
        }

        return Promise.reject(error)
    }
)


export default api;