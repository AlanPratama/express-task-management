import { HTTP_STATUS } from "../shared/constants/http.constant.js"
import { verifyToken } from "../shared/utils/jwt.js"
import { responseError } from "../shared/utils/response.js"

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return responseError(res, HTTP_STATUS.UNAUTHORIZED, "Token required")
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = verifyToken(token)
        console.log(`decoded: ${decoded.data}`);
        

        req.user = decoded.data

        next()
    } catch(error) {
        return responseError(res, HTTP_STATUS.UNAUTHORIZED, "Invalid token")
    }
}