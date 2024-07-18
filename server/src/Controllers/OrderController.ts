import { Request, Response, NextFunction } from "express";

import IOrderController from "../Interfaces/Order/IOrderController";
import IOrderService from "../Interfaces/Order/IOrderService";
import IOrderRequest from "../Interfaces/Order/IOrderRequest";

class OrderController implements IOrderController {
    private readonly OrderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.OrderService = orderService;
    }

    public GetActiveOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { branch_id } = req.query;

            const orders = await this.OrderService.GetActiveOrders(String(branch_id), res.locals.user.id)

            res.status(200).json(orders)
        }
        catch (error) {
            next(error)
        }
    }

    public Store = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                address,
                note,
                lat,
                long,
                client_name,
                client_phone,
                courier_id,
                branch_id,
                products,
                delivery_time
            } = req.body;
    
    
            const orderRequest: IOrderRequest = {
                address,
                note,
                lat,
                long,
                client_name,
                client_phone,
                courier_id,
                branch_id,
                products,
                delivery_time
            }

            const order = await this.OrderService.SaveOrder(orderRequest, res.locals.user.id)

            res.status(200).json(order)
        }
        catch (error) {
            next(error)
        }
    }

    public GetOrderProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { order_id } = req.query;

            const products = await this.OrderService.GetOrderProduct(String(order_id), res.locals.user.id)

            res.status(200).json(products)
        }
        catch (error) {
            next(error)
        }
    }

    public Destroy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { order_id } = req.params;

            await this.OrderService.RemoveOrder(order_id, res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error)
        }
    }

    public Finish = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { order_id } = req.params;

            await this.OrderService.FinishOrder(order_id, res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error)
        }
    }

    public GetLastTwoWeeksOrdersCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { business_id } = req.query;

            const ordersCount = await this.OrderService.GetLastTwoWeeksOrders(String(business_id), res.locals.user.id)

            res.status(200).json(ordersCount)
        }
        catch (error) {
            next(error)
        }
    }
}

export default OrderController