import { Request, Response, NextFunction } from "express";

export default interface IOrderController {
    GetActiveOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}