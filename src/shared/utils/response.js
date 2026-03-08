import { HTTP_STATUS } from "../constants/http.constant"

export const responseSuccess = (res, code = HTTP_STATUS.OK, message = "Success", data) => {
    return res.status(code).json({
        success: true,
        message,
        data
    })
}

export const responseError = (res, code = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = "Internal Server Error", errors) => {
    return res.status(code).json({
        success: false,
        message,
        errors
    })
}