import { responseError } from "../shared/utils/response.js"

export const adminMiddleware = (req, res, next) => {
    
    if (req.user.role !== 'admin') {
        return responseError(res, 403, "Akses dibatasi")
    }

    next()
}