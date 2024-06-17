import IUserModel from "../Models/IUserModel";

export default interface IUserService {
    UserModel: IUserModel;
    registration(name: string, email: string, password: string);
}
