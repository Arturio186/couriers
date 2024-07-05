import IUser from "../Interfaces/User/IUser";

class UserDTO {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: string;
    public isActivated: boolean;

    constructor(user: IUser) {
        this.id = user.id
        this.email = user.email
        this.role = user.role
        this.isActivated = user.is_email_activated
        this.firstName = user.first_name
        this.lastName = user.last_name
    }   
}

export default UserDTO;