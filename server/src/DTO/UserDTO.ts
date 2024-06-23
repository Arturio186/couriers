import IUser from "../Interfaces/User/IUser";

class UserDTO {
    public email: string;
    public id: string;
    public role: string;
    public isActivated: boolean;

    constructor(user: IUser) {
        this.email = user.email
        this.id = user.id
        this.role = user.role
        this.isActivated = user.is_email_activated
    }   
}

export default UserDTO;