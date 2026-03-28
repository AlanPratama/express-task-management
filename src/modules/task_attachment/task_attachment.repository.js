import task_attachmentModel from "./task_attachment.model.js";

export const findAllTaskAttachments = async (taskId) => {
  const criteria = { task: taskId };

  return await task_attachmentModel
    .find(criteria)
    .populate("task")
    .populate("uploadedBy");
};

export const findTaskAttachmentById = (_id) =>
  task_attachmentModel.findOne({ _id }).populate("task").populate("uploadedBy");

export const createTaskAttachment = (task) => task_attachmentModel.create(task);

export const deleteTaskAttachmentById = (_id) =>
  task_attachmentModel.findByIdAndDelete(_id, { returnDocument: "after" });