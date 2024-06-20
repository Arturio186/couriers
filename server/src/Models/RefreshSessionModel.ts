import db from "../Database/db";

import IRefreshSession from "../Interfaces/IRefreshSession";
import IRefreshSessionModel from "../Interfaces/IRefreshSessionModel";

class RefreshSessionModel implements IRefreshSessionModel {
    private tableName = "refresh_sessions";

    public Create = async (session: IRefreshSession): Promise<IRefreshSession> => {
        return db(this.tableName)
                .insert(session)
                .returning<IRefreshSession>("*");
    }

    public Update = async (conditions: Partial<IRefreshSession>, data: Partial<IRefreshSession>): Promise<number> => {
        return db(this.tableName)
                .where(conditions)
                .update(data);
    }

    public FindOne = async (conditions: Partial<IRefreshSession>): Promise<IRefreshSession | undefined> => {
        return db(this.tableName).where(conditions).first();
    }

    public FindAll  = async (conditions: Partial<IRefreshSession>): Promise<IRefreshSession[] | undefined> => {
        return db(this.tableName).where(conditions).orderBy("created_at", "asc");
    }

    public Delete = async (id: number): Promise<number> => {
        return db(this.tableName).where({ id }).del();
    }

    public DeleteByUserId = async (userID: number): Promise<number> => {
        return db(this.tableName).where({ user_id: userID }).del();
    }
}

export default new RefreshSessionModel();