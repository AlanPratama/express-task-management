import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";
import { ErrorUtil } from "../../shared/utils/error.js";


export const checkValidUser = async (workspaceId, userId) => {
  const loggedInUserWorkspaceMember =
    await findWorkspaceMemberByWorkspaceIdAndUserId(workspaceId, userId);

  ErrorUtil.checkForbidden(
    loggedInUserWorkspaceMember.role == "member",
    VALIDATION_MESSAGE.FORBIDDEN_USER_MSG,
  );
};

export const checkOwnedUserWorkspaceMember = async (workspaceId, userId) => {
  const existingWorkspaceMember =
    await findWorkspaceMemberByWorkspaceIdAndUserId(workspaceId, userId);

  ErrorUtil.checkConflict(
    existingWorkspaceMember,
    WorkspaceMemberConstant.WORKSPACE_MEMBER_ALREADY_EXIST_MSG,
  );
};

export const checkOwnerOfWorkspace = async (workspaceMember) => {
  ErrorUtil.checkForbidden(
    workspaceMember.role == "owner",
    WorkspaceMemberConstant.OWNER_CANNOT_BE_REPLACED_MSG,
  );
};


export const requestWorkspaceMemberValidation = [
    body("workspaceId")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Workspace ID")),

    body("memberId")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Member ID")),

    body("privilege")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Privilege"))
    .isString().withMessage(VALIDATION_MESSAGE.STRING("Privilege"))
    .isIn(["view", "edit"]).withMessage("Privilege harus view atau edit"),

    body("role")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Role"))
    .isString().withMessage(VALIDATION_MESSAGE.STRING("Role"))
    .isIn(["admin", "member"]).withMessage("Role harus admin atau member")
]