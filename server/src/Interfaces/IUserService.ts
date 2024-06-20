import IUserModel from "./IUserModel";
import UserDTO from "../DTO/UserDTO";
import IRefreshSessionService from "./IRefreshSessionService";

export default interface IUserService {
    UserModel: IUserModel;
    RefreshSessionService: IRefreshSessionService

    Registration: (name: string, email: string, password: string, roleID: number) => Promise<{
        user: UserDTO;
        accessToken: string;
        refreshToken: string;
    }>;

    Activate: (link: string) => Promise<void>;
    
}   