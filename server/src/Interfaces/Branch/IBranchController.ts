import { Request, Response, NextFunction } from "express";

export default interface IBranchController {
    Store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetByBusiness: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetBranch: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetUserBranches: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetAndroidUserBranches: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    JoinBrnach: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetStaff: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    DeleteBranchStaff: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}