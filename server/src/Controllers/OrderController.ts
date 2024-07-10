import { Request, Response, NextFunction } from "express";

import IOrderController from "../Interfaces/Order/IOrderController";
import IOrderService from "../Interfaces/Order/IOrderService";

class OrderController implements IOrderController {
    private readonly OrderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.OrderService = orderService;
    }

    public GetActiveOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id } = req.query;

            const orders = await this.OrderService.GetActiveOrders(String(branch_id))

            res.status(200).json(orders)
        }
        catch (error) {
            next(error)
        }
    }
}

export default OrderController