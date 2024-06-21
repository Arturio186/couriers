import db from "../Database/db";

import IUserModel from "../Interfaces/IUserModel";
import IUser from "../Interfaces/IUser";

class UserModel implements IUserModel {
    private tableName = "users";

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
