import bcrypt from "bcrypt";
import uuid from 'uuid';

import MailService from "./MailService";

import IUserModel from "../Models/IUserModel";
import IUserService from "./IUserService";

class UserService implements IUserService {
    UserModel: IUserModel;

    constructor(userModel: IUserModel) {
        this.UserModel = userModel;
    }

    async registration(name: string, email: string, password: string) {
        const candidate = await this.UserModel.getUserByEmail(email);

        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует!`);
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const activationLink = uuid.v4()

        const user = await this.UserModel.create(name, email, hashPassword, activationLink);

        await MailService.SendActivationMail(email, activationLink)
    }
}

export default UserService;
