import { ErrorUtil } from "../../shared/utils/error.js";
import { paginationReturn } from "../../shared/utils/pagination.js";
import { findTaskByIdService } from "../task/task.service.js";
import { findUserByIdService } from "../user/user.service.js";
import { TaskAssigneeConstant } from "./task_assignee.constant.js";
import task_assigneeModel from "./task_assignee.model.js";
import {
    createTaskAssignee,
    deleteTaskAssigneeById,
    findAllTaskAssigneePagination,
    findTaskAssigneeById,
    findTaskAssigneeByTaskIdAndAssignedUserId,
    updateTaskAssignee,
} from "./task_assignee.repository.js";

const validateTaskAssigneeUserAlreadyExist = async (taskId, assignedUserId) => {
    const existingTaskAssignee = await findTaskAssigneeByTaskIdAndAssignedUserId(taskId, assignedUserId)

    ErrorUtil.checkConflict(existingTaskAssignee, TaskAssigneeConstant.TASK_ASSIGNEE_CONFLICT_MSG)
}

export const findAllTaskAssigneePaginationService = async (data) => {
  const { taskId, page, limit, skip } = data;

  const taskAssignees = await findAllTaskAssigneePagination(
    taskId,
    skip,
    limit,
  );

  const totalItems = await task_assigneeModel.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  return paginationReturn(taskAssignees, page, totalItems, totalPages);
};

export const findTaskAssigneeByIdService = async (_id) => {
  const taskAssignee = await findTaskAssigneeById(_id);

  ErrorUtil.checkNotFound(
    taskAssignee,
    TaskAssigneeConstant.TASK_ASSIGNEE_NOT_FOUND_MSG,
  );

  return taskAssignee;
};

export const createTaskAssigneeService = async (data) => {
  const { taskId, assignedUserId } = data;

  await validateTaskAssigneeUserAlreadyExist(taskId, assignedUserId)
  
  const task = await findTaskByIdService(taskId);
  const assignedUser = await findUserByIdService(assignedUserId);

  const taskAssignee = await createTaskAssignee(
    new task_assigneeModel({
      task,
      assignedUser,
      assignedAt: new Date(),
    }),
  );

  return await findTaskAssigneeByIdService(taskAssignee._id);
};

export const updateTaskAssigneeService = async (_id, data) => {
  const { taskId, assignedUserId } = data;

  const task = await findTaskByIdService(taskId);
  const assignedUser = await findUserByIdService(assignedUserId);

  const taskAssignee = await findTaskAssigneeByIdService(_id);
  taskAssignee.task = task;
  taskAssignee.assignedUser = assignedUser;

  const updatedTaskAssignee = await updateTaskAssignee(_id, taskAssignee);

  return await findTaskAssigneeByIdService(updatedTaskAssignee._id);
};

export const deleteTaskAssigneeService = async (_id) => {
  await findTaskAssigneeByIdService(_id);

  return await deleteTaskAssigneeById(_id);
};
