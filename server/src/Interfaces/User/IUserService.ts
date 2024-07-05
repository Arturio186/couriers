import UserDTO from "../../DTO/UserDTO";

export default interface IUserService {
    Registration: (name: string, email: string, password: string, role: string) => Promise<{
        user: UserDTO;
        accessToken: string;
        refreshToken: string;
    }>;

    Refresh: (refreshToken: string) => Promise<{
        user: UserDTO;
        accessToken: string;
        refreshToken: string;
    }>;

    Login: (email: string, password: string) => Promise<{
        user: UserDTO;
        accessToken: string;
        refreshToken: string;
    }>

    Activate: (link: string) => Promise<void>;

    Logout: (refreshToken: string) => Promise<void>

    EditProfileInfo: (firstName: string, lastName: string, email: string, userID: string) => Promise<UserDTO>

    UpdatePassword: (oldPassword: string, newPassword: string, userID: string) => Promise<void>

    GetUserInfo: (userID: string) => Promise<UserDTO>
}   
