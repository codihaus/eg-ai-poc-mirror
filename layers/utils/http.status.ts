export interface HttpStatusType {
    code?: number
    message?: string
    data: any
}

/////////////////////////////////


export const ErrorLoginFailed = {
    statusCode: 401,
    statusMessage: "Login Failed",
    stack: ""
}

export const ErrorReadMeFailed = {
    statusCode: 400,
    statusMessage: "Read Me Failed",
    stack: ""
}

export const ErrorProviderIncorrectSSO = {
    statusCode: 400,
    statusMessage: "Provider Incorrect",
    stack: ""
}

export const ErrorLoginSSO = {
    statusCode: 400,
    statusMessage: "Login Error",
    stack: ""
}

export const ErrorUserInvited = {
    statusCode: 400,
    statusMessage: "Invited Error",
    stack: ""
}


export const ErrorUserAcceptInvited = {
    statusCode: 400,
    statusMessage: "Invite Accepted Error",
    stack: ""
}

export const ErrorPasswordRequest = {
    statusCode: 400,
    statusMessage: "Password Request Error",
    stack: ""
}

export const ErrorReadItems = {
    statusCode: 400,
    statusMessage: "Read Items Error",
    stack: ""
}

export const ErrorReadItem = {
    statusCode: 400,
    statusMessage: "Read Item Error",
    stack: ""
}
export const ErrorDeleteItem = {
    statusCode: 400,
    statusMessage: "Delete Item Error",
    stack: ""
}
export const ErrorUpdateItem = {
    statusCode: 400,
    statusMessage: "Update Item Error",
    stack: ""
}
export const ErrorCreateItem = {
    statusCode: 400,
    statusMessage: "Create Item Error",
    stack: ""
}


export const ErrorPasswordReset = {
    statusCode: 400,
    statusMessage: "Password Reset Error",
    stack: ""
}

export const ErrorReadAllFields = {
    statusCode: 400,
    statusMessage: "Read All Fields Error",
    stack: ""
}

export const ErrorReadFieldsCollection = {
    statusCode: 400,
    statusMessage: "Read Fields Collection Error",
    stack: ""
}
export const ErrorReadField = {
    statusCode: 400,
    statusMessage: "Read Field Error",
    stack: ""
}

export const ErrorReadSettings = {
    statusCode: 400,
    statusMessage: "Read Settings Error",
    stack: ""
}



















////////////////////////////

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
