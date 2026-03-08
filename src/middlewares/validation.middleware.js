import { validationResult } from "express-validator"
import { responseError } from "../shared/utils/response.js"
import { HTTP_STATUS } from "../shared/constants/http.constant.js"

export const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

        const formatted = {}

         errors.array().forEach((err) => {
            if (!formatted[err.path]) {
                formatted[err.path] = []
            }

            formatted[err.path].push(err.msg)
         })

         Object.keys(formatted).forEach((key) => {
            if (formatted[key].length === 1) {
                formatted[key] = formatted[key][0]
            }
         })

         return responseError(res, HTTP_STATUS.BAD_REQUEST, "Request tidak valid", formatted)
}