import { Request, Response, NextFunction } from "express";

export default interface IUserController {
    Registration: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Activate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Edit: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Profile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
