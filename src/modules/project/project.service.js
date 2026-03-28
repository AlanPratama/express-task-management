import { ErrorUtil } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findWorkspaceByIdService } from "../workspace/workspace.service.js";
import { validateWorkspaceMember } from "../workspace_member/workspace_member.service.js";
import { ProjectConstant } from "./project.constant.js";
import projectModel from "./project.model.js";
import {
    createProject,
    deleteProjectById,
    findAllProjectPagination,
    findProjectById,
    updateProject,
} from "./project.repository.js";

export const findAllProjectService = async (data) => {
  const { authenticatedUser, workspaceId, page, limit, skip } = data;
  await validateWorkspaceMember(workspaceId, authenticatedUser._id, false);

  const workspaceMembers = await findAllProjectPagination(
    workspaceId,
    skip,
    limit,
  );

  const totalItems = await projectModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(workspaceMembers, page, totalItems, totalPages);
};

export const findProjectByIdService = async (id) => {
  const project = await findProjectById(id);

  ErrorUtil.checkNotFound(project, ProjectConstant.PROJECT_NOT_FOUND_MSG);

  return project;
};

export const createProjectService = async (data) => {
  const { authenticatedUser, workspaceId, name, description } = data;
  await validateWorkspaceMember(workspaceId, authenticatedUser._id, true);

  const workspace = await findWorkspaceByIdService(workspaceId);

  const project = await createProject(
    new projectModel({
      workspace,
      name,
      description,
    }),
  );

  return findProjectByIdService(project._id);
};

export const updateProjectService = async (id, data) => {
  const { authenticatedUser, workspaceId, name, description } = data;
  await validateWorkspaceMember(workspaceId, authenticatedUser._id, true);

  const project = await findProjectByIdService(id);

  const workspace = await findWorkspaceByIdService(workspaceId);

  project.workspace = workspace;
  project.name = name;
  project.description = description;

  return await updateProject(id, project).populate("workspace");
};

export const deleteProjectService = async (id, data) => {
  const { authenticatedUser, workspaceId } = data;
  await validateWorkspaceMember(workspaceId, authenticatedUser._id, true);

  await findProjectByIdService(id);

  return await deleteProjectById(id);
};
