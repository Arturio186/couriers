import IRefreshSession from "./IRefreshSession"

export default interface IRefreshSessionModel {
    Create: (session: IRefreshSession) => Promise<IRefreshSession>
    Update: (conditions: Partial<IRefreshSession>, data: Partial<IRefreshSession>) => Promise<number>
    FindOne: (conditions: Partial<IRefreshSession>) => Promise<IRefreshSession | undefined>
    FindAll: (conditions: Partial<IRefreshSession>) => Promise<IRefreshSession[] | undefined>
    Delete: (conditions: Partial<IRefreshSession>) => Promise<number>
}