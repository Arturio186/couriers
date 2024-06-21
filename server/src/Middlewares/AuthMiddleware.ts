import { Request, Response, NextFunction } from "express";

import JWTManager from "../Utilities/JWTManager";

import APIError from "../Exceptions/APIError";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(APIError.Unauthorized());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(APIError.Unauthorized());
        }

        const userData = JWTManager.ValidateAccessToken(accessToken);
        
        if (!userData) {
            return next(APIError.Unauthorized());
        }

        res.locals.user = userData;

        next();
    } catch (e) {
        return next(APIError.Unauthorized());
    }
}

export default AuthMiddleware;