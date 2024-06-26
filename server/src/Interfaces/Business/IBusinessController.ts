import { Request, Response, NextFunction } from "express";

export default interface IBusinessController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetMyBusiness: (req: Request, res: Response, next: NextFunction) => Promise<void>; 
}