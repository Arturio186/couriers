import db from "../Database/db";

import IUserModel from "./IUserModel";

class UserModel implements IUserModel {
    async getUserByEmail(email: string) {
        const user = await db("users").where({ email }).first();

        return user;
    }

    async create(name: string, email: string, password: string, activationLink: string) {

    }
}

export default new UserModel();
