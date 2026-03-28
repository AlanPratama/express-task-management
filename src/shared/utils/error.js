import { ERROR_CONSTANT } from "../constants/error.constant.js";
import { HTTP_STATUS } from "../constants/http.constant.js";

export const generateError = (status, message = ERROR_CONSTANT.DEFAULT_MSG) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

export const ErrorUtil = {
  checkNotFound: (data, message = ERROR_CONSTANT.DATA_NOT_FOUND_MSG) => {
    if (!data) throw generateError(HTTP_STATUS.NOT_FOUND, message);
  },
  checkConflict: (condition, message = ERROR_CONSTANT.CONFLICT_MSG) => {
    if (condition) throw generateError(HTTP_STATUS.CONFLICT, message)
  },
  checkForbidden: (condition, message = ERROR_CONSTANT.FORBIDDEN_MSG) => {
    if (condition) throw generateError(HTTP_STATUS.FORBIDDEN, message)
  },
  checkUnAuthorized: (condition, message = ERROR_CONSTANT.UNAUTHORIZED_MSG) => {
    if (condition) throw generateError(HTTP_STATUS.UNAUTHORIZED, message)
  }
};
