import { Request, Response, NextFunction } from "express";

export default interface IOrderController {
    GetOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}