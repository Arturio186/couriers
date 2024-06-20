import * as consts from "../Utilities/Consts";

class APIError extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    static BadRequest(message: string) {
        return new APIError(consts.HTTP_STATUS_BAD_REQUEST, "Bad request");
    }

    static Unauthorized(message: string) {
        return new APIError(consts.HTTP_STATUS_UNAUTHORIZED, "Пользователь не авторизован");
    }

    static Forbidden(message: string) {
        return new APIError(consts.HTTP_STATUS_FORBIDDEN, message);
    }

    static NotFound(message: string) {
        return new APIError(consts.HTTP_STATUS_NOT_FOUND, message);
    }
}

export default APIError;
