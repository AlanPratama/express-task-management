import { ErrorUtil } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findUserByIdService } from "../user/user.service.js";
import { findWorkspaceByIdService } from "../workspace/workspace.service.js";
import { WorkspaceMemberConstant } from "./workspace_member.constant.js";
import workspace_memberModel from "./workspace_member.model.js";
import {
  createWorkspaceMember,
  deleteWorkspaceMemberById,
  findAllWorkspaceMemberPagination,
  findWorkspaceMemberById,
  findWorkspaceMemberByWorkspaceIdAndUserId,
  updateWorkspaceMember
} from "./workspace_member.repository.js";
import { checkOwnedUserWorkspaceMember, checkOwnerOfWorkspace, checkValidUser, } from "./workspace_member.validation.js";

export const findAllWorkspaceMemberService = async (data) => {
  const { workspaceId, name, page, limit, skip } = data;

  const workspaceMembers = await findAllWorkspaceMemberPagination(
    workspaceId,
    name,
    skip,
    limit,
  );

  const totalItems = await workspace_memberModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(workspaceMembers, page, totalItems, totalPages);
};

export const findWorkspaceMemberByIdService = async (id) => {
  const workspaceMember = await findWorkspaceMemberById(id);

  ErrorUtil.checkNotFound(
    workspaceMember,
    WorkspaceMemberConstant.WORKSPACE_MEMBER_NOT_FOUND_MSG,
  );

  return workspaceMember;
};

export const findWorkspaceMemberByWorkspaceIdAndUserIdService = async (workspaceId, userId) => {
  const workspaceMember = await findWorkspaceMemberByWorkspaceIdAndUserId(workspaceId, userId);

  ErrorUtil.checkNotFound(
    workspaceMember,
    WorkspaceMemberConstant.WORKSPACE_MEMBER_NOT_FOUND_MSG,
  );

  return workspaceMember;
};

export const createWorkspaceMemberService = async (data) => {
  const { user, workspaceId, memberId, privilege, role } = data;

  const workspace = await findWorkspaceByIdService(workspaceId);

  await checkValidUser(workspaceId, user._id);

  const member = await findUserByIdService(memberId);

  await checkOwnedUserWorkspaceMember(workspace._id, member._id);

  const newWorkspaceMember = await createWorkspaceMember(
    new workspace_memberModel({
      workspace: workspace._id,
      user: member._id,
      privilege,
      role,
    }),
  );

  return await findWorkspaceMemberByIdService(newWorkspaceMember._id);
};

export const updateWorkspaceMemberService = async (id, data) => {
  const { user, memberId, privilege, role } = data;

  const existingWorkspaceMember = await findWorkspaceMemberByIdService(id);

  await checkValidUser(existingWorkspaceMember.workspace._id, user._id);
  await checkOwnerOfWorkspace(existingWorkspaceMember);

  const member = await findUserByIdService(memberId);

  existingWorkspaceMember.user = member;
  existingWorkspaceMember.privilege = privilege;
  existingWorkspaceMember.role = role;

  return await updateWorkspaceMember(id, existingWorkspaceMember);
};

export const deleteWorkspaceMemberService = async (id, data) => {
  const { user } = data;

  const existingWorkspaceMember = await findWorkspaceMemberByIdService(id);

  await checkValidUser(existingWorkspaceMember.workspace._id, user._id);
  await checkOwnerOfWorkspace(existingWorkspaceMember);

  return await deleteWorkspaceMemberById(id);
};
