import { Request, Response } from "express";
import { ListerOrdersService } from "../../services/order/ListOrderService";

class ListOrdersController{
    async handle(req:Request, res:Response){
        // as string | undefined: Fala q o draft é string ou undefined
        const draft = req.query?.draft as string | undefined;

        const listOrders = new ListerOrdersService();

        const orders = await listOrders.execute({
            draft:draft
        })

        res.json(orders)

    }
}

export {ListOrdersController}