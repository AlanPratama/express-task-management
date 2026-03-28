import task_assigneeModel from "./task_assignee.model.js";

export const findAllTaskAssigneePagination = async (taskId, skip, limit) => {
  const criteria = { task: taskId };

  return await task_assigneeModel
    .find(criteria)
    .skip(skip)
    .limit(limit)
    .populate("task")
    .populate("assignedUser");
};

export const findTaskAssigneeById = (_id) =>
  task_assigneeModel.findOne({ _id }).populate("task").populate("assignedUser");

export const findTaskAssigneeByTaskIdAndAssignedUserId = async (
  taskId,
  assignedUserId,
) => {
  const criteria = { task: taskId, assignedUser: assignedUserId };

  return await task_assigneeModel.find(criteria);
};

export const createTaskAssignee = (task) => task_assigneeModel.create(task);

export const updateTaskAssignee = (_id, task) =>
  task_assigneeModel.findByIdAndUpdate(_id, task, {
    returnDocument: "after",
  });

export const deleteTaskAssigneeById = (_id) =>
  task_assigneeModel.findByIdAndDelete(_id, { returnDocument: "after" });
