export default interface IUser {
    id?: string;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    role_id: number;
    is_email_activated?: boolean;
    activation_link?: string;
    created_at?: Date;
    updated_at?: Date;
}