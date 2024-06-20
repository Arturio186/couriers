import * as consts from "../Utilities/Consts";

import { ValidationError } from "express-validator";

class APIError extends Error {
    public status: number;
    public message: string;
    public errors: ValidationError[]

    constructor(status: number, message: string, errors: ValidationError[] = []) {
        super(message);

        this.status = status;
        this.message = message
        this.errors = errors

        Object.setPrototypeOf(this, APIError.prototype) // Фикс, почему-то при выбросе из сервиса еррор миделвара глотала ошибку как Error
        Error.captureStackTrace(this, this.constructor)
    }

    static BadRequest(message: string, errors: ValidationError[] = []) {
        return new APIError(consts.HTTP_STATUS_BAD_REQUEST, message, errors);
    }

    static Unauthorized() {
        return new APIError(consts.HTTP_STATUS_UNAUTHORIZED, "Не авторизован");
    }

    static Forbidden(message: string) {
        return new APIError(consts.HTTP_STATUS_FORBIDDEN, message);
    }

    static NotFound(message: string) {
        return new APIError(consts.HTTP_STATUS_NOT_FOUND, message);
    }
}

export default APIError;
