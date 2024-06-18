import { Request, Response, NextFunction } from "express";
import IUserService from "../Interfaces/IUserService";
import IUserController from "../Interfaces/IUserController";

class UserController implements IUserController {
    public UserService: IUserService

    constructor(userService: IUserService) {
        this.UserService = userService
    }

    public Registration = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = await this.UserService.Registration("artur", "artur@mail.ru", "123", 1)

            res.status(200).json(userData)
        }
        catch (e) {
            console.log(e)
            res.status(500).json('error')
        }
    }

    public Login = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (e) {
            
        }
    }

    public Logout = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (e) {
            
        }
    }

    public Activate = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (e) {
            
        }
    }

    public Refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (e) {
            
        }
    }

    public GetUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(['111', '333'])
        }
        catch (e) {
            
        }
    }
}

export default UserController;
