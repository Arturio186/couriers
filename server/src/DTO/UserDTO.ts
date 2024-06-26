import IUser from "../Interfaces/User/IUser";

class UserDTO {
    public id: string;
    public email: string;
    public role: string;
    public isActivated: boolean;

    constructor(user: IUser) {
        this.id = user.id
        this.email = user.email
        this.role = user.role
        this.isActivated = user.is_email_activated
    }   
}

export default UserDTO;