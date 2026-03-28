import { ERROR_CONSTANT } from "../constants/error.constant.js";
import { HTTP_STATUS } from "../constants/http.constant.js";

export const generateError = (status, message = ERROR_CONSTANT.DEFAULT_MSG.INTERNAL_SERVER) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

export const ErrorUtil = {
  badRequest: (message  = ERROR_CONSTANT.DEFAULT_MSG.BAD_REQUEST) => {
    throw generateError(HTTP_STATUS.BAD_REQUEST, message);
  },

  checkNotFound: (data, message = ERROR_CONSTANT.DEFAULT_MSG.DATA_NOT_FOUND) => {
    if (!data) throw generateError(HTTP_STATUS.NOT_FOUND, message);
  },
  checkConflict: (condition, message = ERROR_CONSTANT.DEFAULT_MSG.CONFLICT) => {
    if (condition) throw generateError(HTTP_STATUS.CONFLICT, message)
  },
  checkForbidden: (condition, message = ERROR_CONSTANT.DEFAULT_MSG.FORBIDDEN) => {
    if (condition) throw generateError(HTTP_STATUS.FORBIDDEN, message)
  },
  checkUnAuthorized: (condition, message = ERROR_CONSTANT.DEFAULT_MSG.UNAUTHORIZED) => {
    if (condition) throw generateError(HTTP_STATUS.UNAUTHORIZED, message)
  }
};
