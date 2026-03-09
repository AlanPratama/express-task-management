import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { generateError } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findUserById } from "../user/user.repository.js";
import { WorkspaceConstant } from "./workspace.constant.js";
import { ListWorkspaceToDTO, WorkspaceToDTO } from "./workspace.mapper.js";
import workspaceModel from "./workspace.model.js";
import {
  createWorkspace,
  deleteWorkspaceById,
  findAllWorkspaceByOwnerIdWithPagination,
  findWorkspaceById,
  updateWorkspace,
} from "./workspace.repository.js";

export const findAllWorkspaceService = async (data) => {
  const { user, page, limit, skip } = data;

  const workspaces = await findAllWorkspaceByOwnerIdWithPagination(
    user._id,
    skip,
    limit,
  );

  const totalItems = await workspaceModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(
    ListWorkspaceToDTO(workspaces),
    page,
    totalItems,
    totalPages,
  );
};

export const findWorkspaceByIdService = async (id, data) => {
  const workspace = await findWorkspaceById(id);

  if (!workspace)
    throw generateError(
      WorkspaceConstant.WORKSPACE_NOT_FOUND_MSG,
      HTTP_STATUS.NOT_FOUND,
    );

  return WorkspaceToDTO(workspace);
};

export const createWorkspaceService = async (data) => {
  const { user, name } = data;

  const owner = await findUserById(user._id);

  const newWorkspace = new workspaceModel({
    owner,
    name,
  });

  return WorkspaceToDTO(await createWorkspace(newWorkspace));
};

export const updateWorkspaceService = async (id, data) => {
  const { name } = data;

  await findWorkspaceByIdService(id);
  
  const updatedWorkspace = await updateWorkspace(id, { name }).populate(
    "owner",
  );

  return WorkspaceToDTO(updatedWorkspace);
};

export const deleteWorkspaceService = async (id, data) => {
  await findWorkspaceByIdService(id, data);

  return WorkspaceToDTO(await deleteWorkspaceById(id));
};
