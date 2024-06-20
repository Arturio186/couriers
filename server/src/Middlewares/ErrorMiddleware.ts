import { Request, Response, NextFunction } from "express";

import APIError from "../Exceptions/APIError";

const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof APIError) {
        return res.status(error.status).json({message: error.message});
    }

    return res.status(500).json({message: "Unexpected error"});
}

export default ErrorMiddleware; 