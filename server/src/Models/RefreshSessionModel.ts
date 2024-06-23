import db from "../Database/db";

import IRefreshSession from "../Interfaces/RefreshSession/IRefreshSession";
import IRefreshSessionModel from "../Interfaces/RefreshSession/IRefreshSessionModel";

class RefreshSessionModel implements IRefreshSessionModel {
    private readonly tableName = "refresh_sessions";

    public Create = async (session: IRefreshSession): Promise<IRefreshSession> => {
        return db(this.tableName)
                .insert(session)
                .returning<IRefreshSession>("*");
    }

    public Update = async (conditions: Partial<IRefreshSession>, data: Partial<IRefreshSession>): Promise<number> => {
        return db(this.tableName)
                .where(conditions)
                .update({
                    ...data,
                    updated_at: db.fn.now()
                });
    }

    public FindOne = async (conditions: Partial<IRefreshSession>): Promise<IRefreshSession | undefined> => {
        return db(this.tableName).where(conditions).first();
    }

    public FindAll  = async (conditions: Partial<IRefreshSession>): Promise<IRefreshSession[] | undefined> => {
        return db(this.tableName).where(conditions).orderBy("created_at", "asc");
    }

    public Delete = async (conditions: Partial<IRefreshSession>): Promise<number> => {
        return db(this.tableName).where(conditions).del();
    }
}

export default new RefreshSessionModel();
