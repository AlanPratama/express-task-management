import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { ErrorUtil, generateError } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findUserById } from "../user/user.repository.js";
import workspace_memberModel from "../workspace_member/workspace_member.model.js";
import { deleteWorkspaceMemberById } from "../workspace_member/workspace_member.repository.js";
import { WorkspaceConstant } from "./workspace.constant.js";
import workspaceModel from "./workspace.model.js";
import {
  createWorkspace,
  deleteWorkspaceById,
  findAllWorkspaceByOwnerIdWithPagination,
  findWorkspaceById,
  updateWorkspace,
} from "./workspace.repository.js";

export const findAllWorkspaceService = async (data) => {
  const { user, name, page, limit, skip } = data;

  const workspaces = await findAllWorkspaceByOwnerIdWithPagination(
    name,
    user._id,
    skip,
    limit,
  );

  const totalItems = await workspaceModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(workspaces, page, totalItems, totalPages);
};

export const findWorkspaceByIdService = async (id) => {
  const workspace = await findWorkspaceById(id);

  ErrorUtil.checkNotFound(workspace, WorkspaceConstant.WORKSPACE_NOT_FOUND_MSG);

  return workspace;
};

export const createWorkspaceService = async (data) => {
  const { user, name } = data;

  const owner = await findUserById(user._id);

  const newWorkspace = await createWorkspace(
    new workspaceModel({
      owner: owner._id,
      name,
    }),
  );

  await workspace_memberModel.create({
    workspace: newWorkspace._id,
    user: owner._id,
    privilege: "edit",
    role: "owner",
  });

  return await findWorkspaceByIdService(newWorkspace._id);
};

export const updateWorkspaceService = async (id, data) => {
  const { name } = data;

  await findWorkspaceByIdService(id);

  const updatedWorkspace = await updateWorkspace(id, { name })
    .populate("owner")
    .populate({
      path: "members",
      populate: { path: "user" },
    });

  return updatedWorkspace;
};

export const deleteWorkspaceService = async (id, data) => {

  await findWorkspaceByIdService(id);

  await deleteWorkspaceMemberById(id)

  return await deleteWorkspaceById(id);
};
