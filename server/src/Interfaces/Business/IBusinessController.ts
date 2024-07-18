import { Request, Response, NextFunction } from "express";

export default interface IBusinessController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetMyBusinesses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetBusiness: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetBranchesSales: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}