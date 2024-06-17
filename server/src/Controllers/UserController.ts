import { Request, Response, NextFunction } from "express";
import IUserService from "../Services/IUserService";
import IUserController from "./IUserController";

class UserController implements IUserController {
    UserService: IUserService

    constructor(userService: IUserService) {
        this.UserService = userService;
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (e) {
            
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (e) {
            
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (e) {
            
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (e) {
            
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (e) {
            
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['111', '333'])
        }
        catch (e) {
            
        }
    }
}

export default UserController;
