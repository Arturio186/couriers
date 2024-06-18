import { Request, Response, NextFunction } from "express";
import IUserService from "./IUserService";

export default interface IUserController {
    UserService: IUserService

    Registration: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Activate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    Refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GetUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
