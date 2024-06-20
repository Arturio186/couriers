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
            const { name, email, password, role } = req.body;

            const userData = await this.UserService.Registration(name, email, password, role)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // https => secure: true
            res.status(200).json(userData)
        }
        catch (error) {
            next(error)
        }
    }

    public Activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const activationLink = req.params.link;
            await this.UserService.Activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            next(error)
        }
    }

    public Login = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    public Logout = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    

    public Refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {

        }
        catch (error) {
            next(error)
        }
    }

    public GetUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(['111', '333'])
        }
        catch (error) {
            next(error)
        }
    }
}

export default UserController;
