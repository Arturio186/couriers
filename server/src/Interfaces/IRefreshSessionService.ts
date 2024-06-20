import IRefreshSession from "./IRefreshSession";
import IRefreshSessionModel from "./IRefreshSessionModel";

export default interface IRefreshSessionService {
    RefreshSessionModel: IRefreshSessionModel;

    GenerateTokens: (payload) => {
        accessToken: string;
        refreshToken: string;
    };
    
    SaveToken: (userID: string, refreshToken: string) => Promise<IRefreshSession | number>;
}
