export default interface IUserModel {
    getUserByEmail(email: string);
    create(name: string, email: string, password: string, activationLink: string);
}
