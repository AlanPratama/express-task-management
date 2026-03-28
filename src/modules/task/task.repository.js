import taskModel from "./task.model";

export const findAllTaskPagination = async (projectId, skip, limit) => {
  const criteria = { project: projectId };

  return await taskModel
    .find(criteria)
    .skip(skip)
    .limit(limit)
    .populate("project")
    .populate("owner");
};

export const findTaskById = (_id) =>
  taskModel.findOne({ _id }).populate("project").populate("owner");

export const createTask = (task) => taskModel.create(task);

export const updateTask = (_id, task) =>
  taskModel.findByIdAndUpdate(_id, task, {
    returnDocument: "after",
  });

export const deleteTaskById = (_id) =>
  taskModel.findByIdAndDelete(_id, { returnDocument: "after" });
