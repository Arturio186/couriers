import * as consts from "../Utilities/Consts";

class APIError extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);

        this.status = status;
        this.message = message

        Object.setPrototypeOf(this, APIError.prototype) // Фикс, почему-то при выбросе из сервиса еррор миделвара глотала ошибку как Error
        Error.captureStackTrace(this, this.constructor)
    }

    static BadRequest(message: string) {
        return new APIError(consts.HTTP_STATUS_BAD_REQUEST, message);
    }

    static Unauthorized(message: string) {
        return new APIError(consts.HTTP_STATUS_UNAUTHORIZED, message);
    }

    static Forbidden(message: string) {
        return new APIError(consts.HTTP_STATUS_FORBIDDEN, message);
    }

    static NotFound(message: string) {
        return new APIError(consts.HTTP_STATUS_NOT_FOUND, message);
    }
}

export default APIError;
