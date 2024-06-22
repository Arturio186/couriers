import IRefreshSession from "./IRefreshSession";

export default interface IRefreshSessionService {
    SaveToken: (userID: string, refreshToken: string) => Promise<IRefreshSession | number>;

    RemoveToken: (refreshToken: string) => Promise<number>

    FindToken: (refreshToken: string) => Promise<IRefreshSession | undefined>
}
