import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import APIError from "../Exceptions/APIError";

const ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(APIError.BadRequest('Ошибка при валидации', errors.array()))
    }
    
    next();
};

export default ValidationMiddleware;