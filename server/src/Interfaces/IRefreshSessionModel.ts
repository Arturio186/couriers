import IRefreshSession from "./IRefreshSession"

export default interface IRefreshSessionModel {
    Create(session: IRefreshSession)
    Update(conditions: Partial<IRefreshSession>, data: Partial<IRefreshSession>)
    FindOne(conditions: Partial<IRefreshSession>)
    FindAll(conditions: Partial<IRefreshSession>)
    Delete(id: number)
    DeleteByUserId(user_id: number)
}