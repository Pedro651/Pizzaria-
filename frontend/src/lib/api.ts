//configuracao inicial como se fosse o axios que utilizamos nos projetos, 
//ele vai ligar com o backend e ja incluir o token na requisição

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function getApiUrl(){
    return API_URL;
}

interface FetchOptions extends RequestInit{
    //Posso receber um token
    token?: string;

    //Escolhe o tipo de cache q vai fazer
    cache?: "force-cache" | "no-store"

    //Controla o cache
    next?:{
        //A forma q pode fazer revalidação, tipos: falso, 0 ou number(passar um valor)
        revalidate?: false | 0 | number;
        //Identificar pra fazer revalidação
        tags?: string[]
    }
}

export async function apiClient<T>(
    //endpoint: É o caminho da rota
    endpoint: string,

    //Aqui vai pegar e guardar as info dentro do body ou no header
    options: FetchOptions = {}
): Promise<T>{

    //Eu vou pegar o token e os restantes das props
    const {token, ...fetchOptions} = options 
    /*fetchOptions->É só um objeto com as “configurações da requisição”,ex:
    GET,POST, DELETE...
    cache
    body
    */

    const headers: Record<string, string> = {
        ...(fetchOptions.headers as Record<string, string>)
    }

    //Se tiver alguma coisa dentro do token, ele injeta 
    if(token){
        headers["Authorization"] = `Bearer ${token}`
    }

    //Se não for envio de arquivo(imagem ou video ), então é JSON
    if(!(fetchOptions.body instanceof FormData)){
        headers["Content-Type"] = "application/json"
    }



    //AQUI FAZ A REQUISIÇÃO:
    //Pega a URL(API_URL) + CAMINHO DA ROTA(endpoint) + CONFIG(fetchOptions) + informações da requisição(headers)
    const response = await fetch(`${API_URL}${endpoint}`,{
        ...fetchOptions,
        headers,
    })



    //VERIFICA SE DEU ERROR, se der ele retorna a menssagem do error
    if(!response.ok){
        const error = await response.json().catch(()=>({
            error:"Erro HTTP: " + response.status,
        }))

    console.log("Status:", response.status);
    console.log("Resposta da API:", error);
        throw new Error(error.error || "Erro  requisição");
    }
    

    //Retorna a resposta
    return response.json()
}