import IUser from "./IUser";

export default interface IUserModel {
    Create: (user: IUser) => Promise<IUser>;
    Update: (conditions: Partial<IUser>, data: Partial<IUser>) => Promise<number>;
    FindOne: (conditions: Partial<IUser>) => Promise<IUser | undefined>;
}
