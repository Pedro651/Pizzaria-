import { Request, Response } from "express";
import { RemoverItemOrderService } from "../../services/order/RemoverItemOrderService";

class RemoverItemController{
    async handle(req:Request, res:Response){
        const {item_id} = req.query

        const itemOrder = new RemoverItemOrderService();

        const item = await  itemOrder.execute({
            item_id:item_id as string
        })

        res.status(200).json(item)
    }
}

export {RemoverItemController}