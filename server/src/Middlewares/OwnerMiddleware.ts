import { Request, Response, NextFunction } from "express";

import APIError from "../Exceptions/APIError";

const OwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = res.locals.user;

        if (role !== "owner") {
            return next(APIError.Forbidden("Пользователь не является владельцем бизнеса"))
        }

        next();
    } catch (e) {
        return next(APIError.Unauthorized());
    }
}

export default OwnerMiddleware;