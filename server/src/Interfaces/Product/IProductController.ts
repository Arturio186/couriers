import { Request, Response, NextFunction } from "express";

export default interface IProductController {
    //Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}