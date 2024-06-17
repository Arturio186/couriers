import { Request, Response, NextFunction } from "express";
import IUserService from "../Services/IUserService";

export default interface IUserController {
    UserService: IUserService;

    registration(req: Request, res: Response, next: NextFunction);
    login(req: Request, res: Response, next: NextFunction);
    logout(req: Request, res: Response, next: NextFunction);
    activate(req: Request, res: Response, next: NextFunction);
    refresh(req: Request, res: Response, next: NextFunction);
    getUsers(req: Request, res: Response, next: NextFunction);
}
