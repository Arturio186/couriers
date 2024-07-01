import { Request, Response, NextFunction } from "express";

export default interface IBranchController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    //Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetByBusiness: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}