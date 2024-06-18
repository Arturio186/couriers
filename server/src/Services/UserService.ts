import bcrypt from "bcrypt";
import { v4 } from "uuid";

import MailService from "./MailService";
import TokenService from "./TokenService";

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
        const tokens = TokenService.GenerateTokens({ ...userDTO });
        
        await TokenService.SaveToken(userDTO.id, tokens.refreshToken);

        await MailService.SendActivationMail(email, activationLink);

        return { ...tokens, user: userDTO };
    };
}

export default UserService;
