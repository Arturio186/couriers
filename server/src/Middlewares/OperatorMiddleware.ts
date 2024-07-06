import { Request, Response, NextFunction } from "express";

import APIError from "../Exceptions/APIError";

const OperatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = res.locals.user;

        if (role !== "operator") {
            return next(APIError.Forbidden("Пользователь не является оператором"))
        }

        next();
    } catch (e) {
        return next(APIError.Unauthorized());
    }
}

export default OperatorMiddleware;