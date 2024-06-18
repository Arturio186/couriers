import IUser from "./IUser";

export default interface IUserModel {
    GetUserByEmail: (email: string) => Promise<IUser | undefined>;
    Create: (user: IUser) => Promise<IUser>;
}
