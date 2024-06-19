import bcrypt from "bcrypt";
import { v4 } from "uuid";

import MailService from "./MailService";
import RefreshSessionService from "./RefreshSessionService";

import IUserModel from "../Interfaces/IUserModel";
import IUserService from "../Interfaces/IUserService";
import UserDTO from "../DTO/UserDTO";

class UserService implements IUserService {
    public UserModel: IUserModel;

    constructor(userModel: IUserModel) {
        this.UserModel = userModel;
    }

    Registration = async (
        name: string,
        email: string,
        password: string,
        roleID: number
    ) => {
        const candidate = await this.UserModel.GetUserByEmail(email);

        console.log({name,email,password,roleID})

        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует!`);
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
        const tokens = RefreshSessionService.GenerateTokens({ ...userDTO });
        
        await RefreshSessionService.SaveToken(userDTO.id, tokens.refreshToken);

        await MailService.SendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        return { ...tokens, user: userDTO };
    };

    Activate = async (link: string) => {
        const user = await this.UserModel.FindOne({ activation_link: link })

        if (!user) {
            throw new Error('Неккоректная ссылка активации')
        }

        await this.UserModel.Update({ id: user.id }, { is_email_activated: true })
    }
}

export default UserService;
