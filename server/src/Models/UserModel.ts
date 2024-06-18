import db from "../Database/db";

import IUserModel from "../Interfaces/IUserModel";
import IUser from "../Interfaces/IUser";

class UserModel implements IUserModel {
    private tableName = "users";

    public Create = async (user: IUser): Promise<IUser> => {
        const [newUser] = await db(this.tableName).insert(user).returning<IUser[]>("*");

        return newUser;
    };

    public GetUserByEmail = async (email: string): Promise<IUser | undefined> => {
        const user = await db(this.tableName).where({ email }).first();

        return user;
    };
}

export default new UserModel();
