import { Request, Response, NextFunction } from "express";

import Logger from "../Utilities/Logger";

import APIError from "../Exceptions/APIError";

const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof APIError) {
        Logger.error("API Error: ", {
            status: error.status,
            message: error.message,
            stack: error.stack,
            errors: error.errors,
        });
        return res.status(error.status).json({message: error.message, errors: error.errors})
    }

    Logger.error("Internal Error: ", {
        status: 500,
        message: error.message,
        stack: error.stack,
    });

    return res.status(500).json({message: "Непредвиденная ошибка"});
}

export default ErrorMiddleware; 