import { ErrorUtil } from "../../shared/utils/error";
import { paginationReturn } from "../../shared/utils/pagination";
import projectModel from "../project/project.model";
import { findProjectByIdService } from "../project/project.service";
import { findUserByIdService } from "../user/user.service";
import { TaskConstant } from "./task.constant";
import taskModel from "./task.model";
import {
  createTask,
  deleteTaskById,
  findAllTaskPagination,
  findTaskById,
  updateTask,
} from "./task.repository";

export const findAllTaskPaginationService = async (data) => {
  const { projectId, page, limit, skip } = data;

  const workspaceMembers = await findAllTaskPagination(projectId, skip, limit);

  const totalItems = await projectModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(workspaceMembers, page, totalItems, totalPages);
};

export const findTaskByIdService = async (id) => {
  const task = await findTaskById(id);

  ErrorUtil.checkNotFound(task, TaskConstant.TASK_NOT_FOUND_MSG);

  return task;
};

export const createTaskService = async (data) => {
  const {
    projectId,
    ownerId,
    title,
    description,
    status,
    priority,
    dueDate,
  } = data;

  const project = await findProjectByIdService(projectId);
  const owner = await findUserByIdService(ownerId)

  dueDate = new Date(dueDate);

  const task = await createTask(
    new taskModel({
      project,
      owner,
      title,
      description,
      status,
      priority,
      dueDate,
    }),
  );

  return await findTaskByIdService(task._id);
};

export const updateTaskService = async (id, data) => {
  const {
    projectId,
    title,
    description,
    status,
    priority,
    dueDate,
  } = data;

  const project = await findProjectByIdService(projectId);
  const task = await findTaskByIdService(id)
  
  dueDate = new Date(dueDate);

  task.project = project
  task.title = title
  task.description = description
  task.status = status
  task.priority = priority
  task.dueDate = dueDate
  
  const updatedTask = await updateTask(id, task)

  return await findTaskByIdService(updatedTask._id)
};

export const deleteTaskService = async (id) => {
    await findTaskByIdService(id)

    return await deleteTaskById(id)
};
