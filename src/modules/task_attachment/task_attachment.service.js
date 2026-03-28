import { cloudinaryDeleteFile, cloudinaryUploadBuffer } from "../../shared/utils/cloudinary_upload.js";
import { ErrorUtil } from "../../shared/utils/error.js";
import { findTaskByIdService } from "../task/task.service.js";
import { TaskUtil } from "../task/task.util.js";
import { findUserByIdService } from "../user/user.service.js";
import { TaskAttachmentConstant } from "./task_attachment.constant.js";
import task_attachmentModel from "./task_attachment.model.js";
import {
    createTaskAttachment,
  deleteTaskAttachmentById,
  findAllTaskAttachments,
  findTaskAttachmentById,
} from "./task_attachment.repository.js";

export const findAllTaskAttachmentsService = async (data) => {
  const { taskId } = data;

  return await findAllTaskAttachments(taskId);
};

export const findTaskAttachmentByIdService = async (id) => {
  const taskAttachment = await findTaskAttachmentById(id);

  ErrorUtil.checkNotFound(
    taskAttachment,
    TaskAttachmentConstant.TASK_ATTACHMENT_NOT_FOUND_MSG,
  );

  return taskAttachment;
};

export const createTaskAttachmentService = async (data) => {
  const { authenticatedUser, taskId, fileBuffer } = data;

  const task = await findTaskByIdService(taskId);
  const uploadedBy = await findUserByIdService(authenticatedUser._id);

  const responseCloudinary = await cloudinaryUploadBuffer(
    TaskUtil.CLOUDINARY_FOLDER_TASK(taskId),
    fileBuffer,
  );

  const fileUrl = responseCloudinary.secure_url;
  const publicId = responseCloudinary.public_id;

  const taskAttachment = await createTaskAttachment(
    new task_attachmentModel({
      task,
      uploadedBy,
      fileUrl,
      publicId,
    }),
  );

  return await findTaskAttachmentByIdService(taskAttachment._id);
};

export const deleteTaskAttachmentService = async (id) => {
  const taskAttachment = await findTaskAttachmentByIdService(id);

  await cloudinaryDeleteFile(taskAttachment.publicId)

  return await deleteTaskAttachmentById(id);
};
