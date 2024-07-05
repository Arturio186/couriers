import db from "../Database/db";

import IUserModel from "../Interfaces/User/IUserModel";
import IUser from "../Interfaces/User/IUser";

class UserModel implements IUserModel {
    private readonly tableName = "users";

    public Create = async (user: IUser): Promise<IUser> => {
        const [newUser] = await db(this.tableName).insert(user).returning<IUser[]>("*");

        return newUser;
    };

    public Update = async (conditions: Partial<IUser>, data: Partial<IUser>): Promise<IUser> => {
        const [updatedUser] = await db(this.tableName)
                .where(conditions)
                .update({
                    ...data,
                    updated_at: db.fn.now()
                })
                .returning<IUser[]>('*');

        return updatedUser;
    }

    public FindOne = async (conditions: Partial<IUser>): Promise<IUser | undefined> => {
        const qualifiedConditions = {};

        for (const [key, value] of Object.entries(conditions)) {
            qualifiedConditions[`users.${key}`] = value;
        }

        return db(this.tableName)
                .join('roles', 'roles.id', '=', 'users.role_id')
                .where(qualifiedConditions)
                .select('users.*', 'roles.name as role')
                .first();
    }

    public Delete = async (conditions: Partial<IUser>) => {
        return db(this.tableName).where(conditions).del();
    };
}

export default new UserModel();
