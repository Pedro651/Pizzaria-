import {Request, Response} from "express"
import {DetailUserService} from "../../services/user/DetailUserService"

class DetailUSerController{
    async handle(req: Request, res:Response){
      //Esse user_id ele pega da req e colocar dentro da variavel user_id para poder usa-la
      const user_id = req.user_id

        const detailUser = new DetailUserService();

        const user = await detailUser.execute(user_id);

        
      return res.json(user)
    }
}

export {DetailUSerController}