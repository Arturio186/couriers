import jwt from "jsonwebtoken";

import IUser from "../Interfaces/IUser";

class JWTManager {
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

    public ValidateAccessToken = (token: string) => {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET
            ) as IUser;
            return userData;
        } catch (e) {
            return null;
        }
    };

    public ValidateRefreshToken = (token: string) => {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            ) as IUser;
            return userData;
        } catch (e) {
            return null;
        }
    };
}

export default new JWTManager();
