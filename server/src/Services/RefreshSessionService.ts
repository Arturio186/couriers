import RefreshSessionModel from "../Models/RefreshSessionModel";

import IRefreshSessionModel from "../Interfaces/RefreshSession/IRefreshSessionModel";
import IRefreshSessionService from "../Interfaces/RefreshSession/IRefreshSessionService";

import APIError from "../Exceptions/APIError";

class RefreshSessionService implements IRefreshSessionService {
    private readonly RefreshSessionModel: IRefreshSessionModel;
    private readonly MaxSessions = 5;

    constructor(refreshSessionModel: IRefreshSessionModel) {
        this.RefreshSessionModel = refreshSessionModel;
    }

    public SaveToken = async (userID: string, refreshToken: string) => {
        const sessions = await RefreshSessionModel.FindAll({
            user_id: userID,
        });

        if (sessions.length >= this.MaxSessions) {
            const oldestSession = sessions.reduce((oldest, session) => {
                return oldest.updated_at < session.updated_at ? oldest : session;
            });
    
            this.RefreshSessionModel.Delete({ id: oldestSession.id })
        }

        return await this.RefreshSessionModel.Create({
            user_id: userID,
            token: refreshToken,
        });
    };

    public UpdateToken = async (userID: string, oldToken: string, newToken: string) => {
        const tokenData = await this.RefreshSessionModel.FindOne({
            user_id: userID,
            token: oldToken
        });

        if (!tokenData) {
            throw APIError.BadRequest('Сессия не найдена');
        }

        return await this.RefreshSessionModel.Update(
            { 
                token: oldToken,
                user_id: userID
            },
            { token: newToken }
        );
    }

    public RemoveToken = async (refreshToken: string) => {
        return await this.RefreshSessionModel.Delete({ token: refreshToken })
    }

    public FindToken = async (refreshToken: string) => {
        const token = await this.RefreshSessionModel.FindOne({token: refreshToken})
        return token;
    }
}

export default RefreshSessionService;
