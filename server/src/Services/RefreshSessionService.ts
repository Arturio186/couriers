import jwt from "jsonwebtoken";

import RefreshSessionModel from "../Models/RefreshSessionModel";

import IRefreshSessionModel from "../Interfaces/IRefreshSessionModel";
import IRefreshSessionService from "../Interfaces/IRefreshSessionService";

class RefreshSessionService implements IRefreshSessionService {
    RefreshSessionModel: IRefreshSessionModel;

    constructor(refreshSessionModel: IRefreshSessionModel) {
        this.RefreshSessionModel = refreshSessionModel;
    }

    public GenerateTokens = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        });

        return {
            accessToken,
            refreshToken,
        };
    };

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
}

export default RefreshSessionService;
