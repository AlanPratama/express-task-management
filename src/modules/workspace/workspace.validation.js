import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { UserConstant } from "../user/user.constant.js";
import { WorkspaceConstant } from "./workspace.constant.js";

export const validateWorkspaceOwner = async (workspace, owner) => {
  if (!workspace)
    throw generateError(WorkspaceConstant.WORKSPACE_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  if (!owner)
    throw generateError(UserConstant.USER_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  if (workspace.ownerId !== owner.id)
    throw generateError(WorkspaceConstant.NOT_VALID_OWNER_MSG, HTTP_STATUS.FORBIDDEN);
};
