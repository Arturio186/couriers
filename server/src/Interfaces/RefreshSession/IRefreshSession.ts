export default interface IRefreshSession {
    id?: number;
    user_id: string;
    token: string;
    created_at?: Date;
    updated_at?: Date;
}