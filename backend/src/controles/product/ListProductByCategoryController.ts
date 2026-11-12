import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";

class ListProductByController{
    async handle(req:Request, res:Response){
        const category_id = req.query.category_id as string;

        const ListProductByCategory = new  ListProductByCategoryService();

        const product = await ListProductByCategory.execute({
            category_id:category_id
        })



      res.status(200).json(product)
    }
}

export {ListProductByController}