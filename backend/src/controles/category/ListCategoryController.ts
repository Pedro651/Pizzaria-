import { Request,Response } from "express";
import { ListCategoryService } from "../../services/category/ListCAtegoryService";

class ListCategoryController{
    async handle(req:Request, res:Response){
        const listCategory = new ListCategoryService();

        const category = await listCategory.execute();

        res.json(category).status(200)
    }
}

export { ListCategoryController }