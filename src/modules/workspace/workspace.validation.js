import { body } from "express-validator";
import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { generateError } from "../../shared/utils/error.js";
import { UserConstant } from "../user/user.constant.js";
import { WorkspaceConstant } from "./workspace.constant.js";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";

export const validateWorkspaceOwner = (workspace, owner) => {
  if (!workspace)
    throw generateError(WorkspaceConstant.WORKSPACE_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  if (!owner)
    throw generateError(UserConstant.USER_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  if (workspace.owner._id !== owner._id)
    throw generateError(WorkspaceConstant.NOT_VALID_OWNER_MSG, HTTP_STATUS.FORBIDDEN);
};

export const requestWorkspaceValidation = [
  body("name")
  .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Nama"))
  .isString().withMessage(VALIDATION_MESSAGE.STRING("Nama"))
  .isLength({ min: 4 }).withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Nama", 4))
]