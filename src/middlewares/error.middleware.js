import { HTTP_STATUS } from "../shared/constants/http.constant.js";
import { responseError } from "../shared/utils/response.js";

export const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    
    return responseError(res, err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR, err.message || "Internal Server Error")
}