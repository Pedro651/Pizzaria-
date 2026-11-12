import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController{
    async handle(req: Request, res:Response){

        const {name ,table} = req.body;

        const listOrder = new CreateOrderService();

        const orders = await listOrder.execute({
        table: Number(table),
        name,
        })

        res.status(201).json(orders);

    }
}

export { CreateOrderController }