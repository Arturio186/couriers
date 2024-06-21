import RefreshSessionModel from "../Models/RefreshSessionModel";

import IRefreshSessionModel from "../Interfaces/IRefreshSessionModel";
import IRefreshSessionService from "../Interfaces/IRefreshSessionService";

class RefreshSessionService implements IRefreshSessionService {
    RefreshSessionModel: IRefreshSessionModel;

    constructor(refreshSessionModel: IRefreshSessionModel) {
        this.RefreshSessionModel = refreshSessionModel;
    }

    public SaveToken = async (userID: string, refreshToken: string) => {
        const tokenData = await RefreshSessionModel.FindOne({
            user_id: userID,
        });

        if (tokenData) {
            return await this.RefreshSessionModel.Update(
                { user_id: userID },
                { token: refreshToken }
            );
        }

        return await this.RefreshSessionModel.Create({
            user_id: userID,
            token: refreshToken,
        });
    };

    public RemoveToken = async (refreshToken: string) => {
        return await this.RefreshSessionModel.Delete({ token: refreshToken })
    }

    public FindToken = async (refreshToken: string) => {
        const token = await this.RefreshSessionModel.FindOne({token: refreshToken})
        return token;
    }
}

export default RefreshSessionService;
