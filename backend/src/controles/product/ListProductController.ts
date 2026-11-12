import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController{
    async handle(req:Request,res:Response){
        const disable = req.query.disable as string | undefined;

        const listProduct =  new ListProductService();

        const products = await listProduct.execute({
            //Se Ñ existir o disble mande false
            disable: disable 
        })

        res.status(200).json(products)


    }
}

export{ListProductController}