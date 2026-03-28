import { ErrorUtil } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findProjectByIdService } from "../project/project.service.js";
import { findUserByIdService } from "../user/user.service.js";
import { TaskConstant } from "./task.constant.js";
import taskModel from "./task.model.js";
import {
  createTask,
  deleteTaskById,
  findAllTaskPagination,
  findTaskById,
  updateTask,
} from "./task.repository.js";

export const findAllTaskPaginationService = async (data) => {
  const { projectId, page, limit, skip } = data;

  const tasks = await findAllTaskPagination(projectId, skip, limit);

  const totalItems = await taskModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(tasks, page, totalItems, totalPages);
};

export const findTaskByIdService = async (id) => {
  const task = await findTaskById(id);

  ErrorUtil.checkNotFound(task, TaskConstant.TASK_NOT_FOUND_MSG);

  return task;
};

export const createTaskService = async (data) => {
  const {
    authenticatedUser,
    projectId,
    title,
    content,
    status,
    priority,
    dueDate,
  } = data;

  const project = await findProjectByIdService(projectId);
  const owner = await findUserByIdService(authenticatedUser._id)

  const task = await createTask(
    new taskModel({
      project,
      owner,
      title,
      content,
      status: TaskConstant.STATUS.PENDING.value,
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
    content,
    status,
    priority,
    dueDate,
  } = data;

  const project = await findProjectByIdService(projectId);
  const task = await findTaskByIdService(id)
  
  task.project = project
  task.title = title
  task.content = content
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
