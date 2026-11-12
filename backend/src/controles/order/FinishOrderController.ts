import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";
import { FinishOrderService } from "../../services/order/FinishOrderService";


class FinishOrderController{
    async handle(req:Request, res:Response){
        const {order_id} = req.body;

        const FinishOrder = new FinishOrderService()

        const updateOrder = await FinishOrder.execute({
            order_id:order_id 
        })

        res.json(updateOrder)
    }

}

export {FinishOrderController}