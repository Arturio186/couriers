import bcrypt from "bcrypt";
import { v4 } from "uuid";

import JWTManager from "../Utilities/JWTManager";
import MailSender from "../Utilities/MailSender";

import IUserModel from "../Interfaces/IUserModel";
import IUserService from "../Interfaces/IUserService";
import IRefreshSessionService from "../Interfaces/IRefreshSessionService";

import UserDTO from "../DTO/UserDTO";

import APIError from "../Exceptions/APIError";

class UserService implements IUserService {
    public UserModel: IUserModel;
    public RefreshSessionService: IRefreshSessionService;

    constructor(userModel: IUserModel, refreshSessionService: IRefreshSessionService) {
        this.UserModel = userModel;
        this.RefreshSessionService = refreshSessionService;
    }

    Registration = async (name: string, email: string, password: string, roleID: number) => {
        const candidate = await this.UserModel.FindOne({email});

        if (candidate) {
            throw APIError.BadRequest(`Пользователь с email ${email} уже существует!`);
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const activationLink = v4();

        const user = await this.UserModel.Create({
            first_name: name,
            email: email,
            password: hashPassword,
            activation_link: activationLink,
            role_id: roleID,
        });

        const userDTO = new UserDTO(user);
        const tokens = JWTManager.GenerateTokens({ ...userDTO });
        
        await this.RefreshSessionService.SaveToken(userDTO.id, tokens.refreshToken);

        await MailSender.SendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        return { ...tokens, user: userDTO };
    };

    Activate = async (link: string) => {
        const user = await this.UserModel.FindOne({ activation_link: link })

        if (!user) {
            throw APIError.BadRequest('Неккоректная ссылка активации')
        }

        await this.UserModel.Update({ id: user.id }, { is_email_activated: true })
    }

    Login = async (email: string, password: string) => {
        const user = await this.UserModel.FindOne({email})
        if (!user) {
            throw APIError.BadRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw APIError.BadRequest('Неверный пароль');
        }

        const userDTO = new UserDTO(user);
        const tokens = JWTManager.GenerateTokens({...userDTO});

        await this.RefreshSessionService.SaveToken(userDTO.id, tokens.refreshToken);

        return {...tokens, user: userDTO}
    }

    Logout = async (refreshToken: string) => {
        await this.RefreshSessionService.RemoveToken(refreshToken);
    }

    Refresh = async (refreshToken: string) => {
        if (!refreshToken) {
            throw APIError.Unauthorized();
        }

        const userData = JWTManager.ValidateRefreshToken(refreshToken);
        const tokenFromDb = await this.RefreshSessionService.FindToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw APIError.Unauthorized();
        }

        const user = await this.UserModel.FindOne({ id: userData.id });
        const userDTO = new UserDTO(user);
        const tokens = JWTManager.GenerateTokens({...userDTO});

        await this.RefreshSessionService.SaveToken(userDTO.id, tokens.refreshToken);
        return {...tokens, user: userDTO}
    }


}

export default UserService;
