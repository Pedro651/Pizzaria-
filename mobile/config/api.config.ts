//Configurando a conexão da api
//Tem que pegar o seu IPv4(é o ip da sua maquina) pq no celular ele n roda no localhost
//ipconfig no cmd
export const API_CONTIG = {
    BASE_URL:"http://192.168.0.149:3333",
    //Se n responder em 12 segundo volta um error
    TIMEOUT: 12000 //12 segundos
}