import { Request, Response, NextFunction } from "express";

export default interface ICategoryController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}