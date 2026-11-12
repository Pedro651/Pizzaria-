import { Request, Response } from "express";


import { DeleteOrderService } from "../../services/order/DeleteOrderService";


class DeleteOrderController{
    async handle(req:Request, res:Response){
        const order_id = req.query?.order_id;

        const FinishOrder = new DeleteOrderService()

        const DeleteOrder = await FinishOrder.execute({
            order_id:order_id  as string
        })

        res.json(DeleteOrder)
    }

}

export {DeleteOrderController}