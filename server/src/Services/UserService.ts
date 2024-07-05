import bcrypt from "bcrypt";
import { v4 } from "uuid";

import JWTManager from "../Utilities/JWTManager";
import MailSender from "../Utilities/MailSender";

import IUserModel from "../Interfaces/User/IUserModel";
import IUserService from "../Interfaces/User/IUserService";
import IRefreshSessionService from "../Interfaces/RefreshSession/IRefreshSessionService";

import UserDTO from "../DTO/UserDTO";

import APIError from "../Exceptions/APIError";
import IRoleService from "../Interfaces/Role/IRoleService";
import IUser from "../Interfaces/User/IUser";

class UserService implements IUserService {
    private readonly UserModel: IUserModel;
    private readonly RefreshSessionService: IRefreshSessionService;
    private readonly RoleService: IRoleService;

    constructor(userModel: IUserModel, refreshSessionService: IRefreshSessionService, roleService: IRoleService) {
        this.UserModel = userModel;
        this.RefreshSessionService = refreshSessionService;
        this.RoleService = roleService;
    }

    public Registration = async (name: string, email: string, password: string, role: string) => {
        const candidate = await this.UserModel.FindOne({email});

        if (candidate) {
            throw APIError.BadRequest(`Пользователь с email ${email} уже существует!`);
        }

        const userRole = await this.RoleService.FindRole(role);

        const hashPassword = await bcrypt.hash(password, 5);

        const activationLink = v4();

        const user = await this.UserModel.Create({
            first_name: name,
            email: email,
            password: hashPassword,
            activation_link: activationLink,
            role_id: userRole.id,
        });

        const userDTO = new UserDTO({ ...user, role: userRole.name });
        const tokens = JWTManager.GenerateTokens({ ...userDTO });
        
        await this.RefreshSessionService.SaveToken(userDTO.id, tokens.refreshToken);

        await MailSender.SendActivationMail(email, `${process.env.API_URL}/api/user/activate?link=${activationLink}`);

        return { ...tokens, user: userDTO };
    };

    public Activate = async (link: string) => {
        const user = await this.UserModel.FindOne({ activation_link: link })

        if (!user) {
            throw APIError.BadRequest('Неккоректная ссылка активации')
        }

        await this.UserModel.Update({ id: user.id }, { is_email_activated: true })
    }

    public Login = async (email: string, password: string) => {
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

    public Logout = async (refreshToken: string) => {
        await this.RefreshSessionService.RemoveToken(refreshToken);
    }

    public Refresh = async (refreshToken: string) => {
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

        await this.RefreshSessionService.UpdateToken(userDTO.id, refreshToken, tokens.refreshToken);
        return {...tokens, user: userDTO}
    }

    public EditProfileInfo = async (firstName: string, lastName: string, email: string, userID: string) => {
        const candidate = await this.UserModel.FindOne({ email });

        const user = await this.UserModel.FindOne({ id: userID })

        if (candidate && user.id !== candidate.id) {
            throw APIError.BadRequest(`Пользователь с email ${email} уже существует!`);
        }

        const updatedFields: Partial<IUser> = {
            first_name: firstName,
            last_name: lastName,
        }

        if (user.email != email) {
            const newActivationLink = v4();
            updatedFields.email = email;
            updatedFields.activation_link = newActivationLink;
            updatedFields.is_email_activated = false;

            await MailSender.SendActivationMail(email, `${process.env.API_URL}/api/user/activate?link=${newActivationLink}`);
        }

        const updatedUser = await this.UserModel.Update({ id: user.id }, updatedFields)

        return new UserDTO(updatedUser)
    }

    public GetUserInfo = async (userID: string) => {
        const user = await this.UserModel.FindOne({ id: userID })

        return new UserDTO(user)
    }

}

export default UserService;
