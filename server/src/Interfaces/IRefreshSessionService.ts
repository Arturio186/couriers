import { JwtPayload } from "jsonwebtoken";

import IRefreshSession from "./IRefreshSession";
import IRefreshSessionModel from "./IRefreshSessionModel";

import IUser from "./IUser";

export default interface IRefreshSessionService {
    RefreshSessionModel: IRefreshSessionModel;
    
    SaveToken: (userID: string, refreshToken: string) => Promise<IRefreshSession | number>;

    RemoveToken: (refreshToken: string) => Promise<number>

    FindToken: (refreshToken: string) => Promise<IRefreshSession | undefined>
}
