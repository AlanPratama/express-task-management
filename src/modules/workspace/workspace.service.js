import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { generateError } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findUserByTokenService } from "../user/user.service";
import { WorkspaceConstant } from "./workspace.constant.js";
import workspaceModel from "./workspace.model.js";
import {
  createWorkspace,
  deleteWorkspaceById,
  findWorkspaceById,
  updateWorkspace,
} from "./workspace.repository.js";
import { validateWorkspaceOwner } from "./workspace.validation.js";

export const findAllWorkspaceService = async (data) => {
  const { page, limit, skip } = data;

  const workspaces = workspaceModel.find({}).skip(skip).limit(limit).exec();

  const totalItems = await workspaceModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(workspaces, page, totalItems, totalPages);
};

export const findWorkspaceByIdService = async (id) => {
  const workspace = await findWorkspaceById(id);

  if (!workspace)
    throw generateError(
      WorkspaceConstant.WORKSPACE_NOT_FOUND_MSG,
      HTTP_STATUS.NOT_FOUND,
    );

  return workspace;
};

export const createWorkspaceService = async (data) => {
  const { token, name } = data;

  const owner = findUserByTokenService(token);

  const newWorkspace = new workspaceModel({
    owner,
    name,
  });

  return await createWorkspace(newWorkspace);
};

export const updateWorkspaceService = async (id, data) => {
  const { token } = data;

  const owner = findUserByTokenService(token);

  const existWorkspace = findWorkspaceByIdService(id);

  validateWorkspaceOwner(existWorkspace, owner);

  existWorkspace.name = data.name;

  return await updateWorkspace(id, newWorkspace);
};

export const deleteWorkspaceService = async (id, data) => {
  const { token } = data;

  const owner = findUserByTokenService(token);

  const existWorkspace = findWorkspaceByIdService(id);

  validateWorkspaceOwner(existWorkspace, owner);

  return await deleteWorkspaceById(id);
};
