import IUser from "../Interfaces/User/IUser";

class UserDTO {
    public email: string;
    public id: string;
    public role_id: number;
    public isActivated: boolean;

    constructor(user: IUser) {
        this.email = user.email
        this.id = user.id
        this.role_id = user.role_id
        this.isActivated = user.is_email_activated
    }   
}

export default UserDTO;