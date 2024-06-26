import { Request, Response, NextFunction } from "express";

export default interface IBusinessController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}