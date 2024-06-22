import db from "../Database/db";

import IUserModel from "../Interfaces/User/IUserModel";
import IUser from "../Interfaces/User/IUser";

class UserModel implements IUserModel {
    private readonly tableName = "users";

    public Create = async (user: IUser): Promise<IUser> => {
        const [newUser] = await db(this.tableName).insert(user).returning<IUser[]>("*");

        return newUser;
    };

    public Update = async (conditions: Partial<IUser>, data: Partial<IUser>): Promise<number> => {
        return db(this.tableName)
                .where(conditions)
                .update(data);
    }

    public FindOne = async (conditions: Partial<IUser>): Promise<IUser | undefined> => {
        return db(this.tableName).where(conditions).first();
    }
}

export default new UserModel();
