import { Request, Response, NextFunction } from "express";

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
            const { link } = req.query;

            await this.UserService.Activate(String(link));
            
            res.status(200).json('Email адрес подтвержден');
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

    public Edit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { first_name, last_name, email } = req.body;

            const updatedUser = await this.UserService.EditProfileInfo(first_name, last_name || "", email, res.locals.user.id)

            console.log(updatedUser)

            res.status(200).json(updatedUser)
        }
        catch (error) {
            next(error)
        }
    }

    public Profile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInfo = await this.UserService.GetUserInfo(res.locals.user.id)

            res.status(200).json(userInfo)
        }
        catch (error) {
            next(error)
        }
    }

    public UpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { old_password, new_password } = req.body;

            await this.UserService.UpdatePassword(old_password, new_password, res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error)
        }
    }

    public DeleteAccount = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const { password } = req.body;

            await this.UserService.DeleteAccount(password, res.locals.user.id)

            res.status(200).json("Success")
        }
        catch (error) {
            next(error)
        }
    }
}

export default UserController;
