import { HTTP_STATUS } from "../shared/constants/http.constant.js"
import { responseError } from "../shared/utils/response.js"

export const adminMiddleware = (req, res, next) => {
    
    if (req.user.role !== 'admin') {
        return responseError(res, HTTP_STATUS.FORBIDDEN, "Akses dibatasi")
    }

    next()
}