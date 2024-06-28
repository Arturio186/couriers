import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import APIError from "../Exceptions/APIError";

import IUserService from "../Interfaces/User/IUserService";
import IUserController from "../Interfaces/User/IUserController";

class UserController implements IUserController {
    private readonly UserService: IUserService

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
            const { email, password } = req.body;
            const userData = await this.UserService.Login(email, password);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // https => secure: true
            res.status(200).json(userData)
        }
        catch (error) {
            next(error)
        }
    }

    public Logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            await this.UserService.Logout(refreshToken);

            res.clearCookie('refreshToken');
            res.status(200).json('success');
        }
        catch (error) {
            next(error)
        }
    }
    
    public Refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            
            const userData = await this.UserService.Refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            res.status(200).json(userData);
        }
        catch (error) {
            next(error)
        }
    }
}

export default UserController;
