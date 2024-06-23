import IRefreshSession from "./IRefreshSession";

export default interface IRefreshSessionService {
    SaveToken: (userID: string, refreshToken: string) => Promise<IRefreshSession>;

    UpdateToken: (userID: string, oldToken: string, newToken: string) => Promise<number>

    RemoveToken: (refreshToken: string) => Promise<number>

    FindToken: (refreshToken: string) => Promise<IRefreshSession | undefined>
}
