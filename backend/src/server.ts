// Permite acesso à API por outros domínios
import cors from "cors"
// Carrega variáveis do arquivo .env
import "dotenv/config"
import express,{NextFunction, Request,Response} from "express"
import {router} from "./routes"
// Cria o servidor
const app = express();

// Permite receber JSON nas requisições
app.use(express.json());
// Ativa o CORS
app.use(cors());
app.use(router);

//Pra poder aparecer a menssagem que vc colocou pra quando der erro você precisa colocar o next 
app.use((error: Error, _:Request, res:Response, next: NextFunction)=>{
    if(error instanceof Error){
        return res.status(400).json({
            error:error.message
        })
    }

    return res.status(500).json({
        error:"Internal server error!"
    });
});

// Usa a porta do .env ou 3333
const PORT = process.env.PORT || 3333;

// Inicia o servidor
app.listen(PORT,() =>{
    console.log("Servidor rodando na porta" + PORT)
})


