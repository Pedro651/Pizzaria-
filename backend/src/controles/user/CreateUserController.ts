import{Request,Response} from "express"
import { CreateUSerService } from "../../services/user/CreateUserService"

class CreateUSerController{
    async handle(req: Request ,res:Response ){
        // Pega os dados enviados pelo usuário no body
        const {name, email, password } = req.body;

        //Ele pega as informações do arquivo service dele e transforma em um objeto para ser usado
        const creatUserService = new CreateUSerService();
        //Executa o service passando os dados do usuário(onde está os dados do usuário: creatUserService)
        const user = await creatUserService.execute({
            name: name,
            email:email,
            password:password,
        });

        //Serve para enviar a resposta do backend para o frontend em formato JSON: aparece la no postman quando vc testa.
        res.json(user);
    }
}

export { CreateUSerController }