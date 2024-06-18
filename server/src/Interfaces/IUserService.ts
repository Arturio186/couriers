import IUserModel from "./IUserModel";
import UserDTO from "../DTO/UserDTO";

export default interface IUserService {
    UserModel: IUserModel;

    Registration: (name: string, email: string, password: string, roleID: number) => Promise<{
        user: UserDTO;
        accessToken: string;
        refreshToken: string;
    }>;
    
}   
