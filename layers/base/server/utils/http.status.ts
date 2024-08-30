import {HttpStatusType} from "../types/http-status.type";

export const SuccessResponseStatus = (data, message = "Success"): HttpStatusType => {
    return response({
        code: 200,
        message: message,
        data
    });
};


export const ErrorResponse = (data, code = 400, message = "Error"): HttpStatusType => {
    return response({
        code: code,
        message: message,
        data: data
    });
}


export const ErrorAuth = (data, code = 401, message = "Unauthorized"): HttpStatusType => {
    return response({
        code: code,
        message: message,
        data: data
    });
}

export const response = (options) => {
    return {
        code: options?.code,
        message: options?.message,
        data: options?.data,
        ...options
        // nếu cần điều chỉnh gì chung
    };
}

export const FailedResponseStatus = (options?: {
    code?: number;
    message?: string
    data?: any;
    detail?: any
}): HttpStatusType => {
    return {
        code: options?.code || 401,
        data: options?.data,
        message: options?.message || "Failed",
        detail: options?.detail
    };
};
