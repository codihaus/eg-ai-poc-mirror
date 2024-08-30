export const apiResponseStandard = (statusCode: any, message: any, extend: any, data: any) => {

    return {
        status: !statusCode ? 200 : statusCode,
        message,
        ...extend,
        data: data
    }

}