import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { getPaginationParams } from "../../shared/utils/pagination.js";
import { responseSuccess } from "../../shared/utils/response.js";
import {
  createTaskAttachmentService,
  deleteTaskAttachmentService,
  findAllTaskAttachmentsService,
  findTaskAttachmentByIdService,
} from "./task_attachment.service.js";

export const findAllTaskAttachments = asyncHandler(async (req, res) => {
  req.body = getPaginationParams(req);

  const data = await findAllTaskAttachmentsService(req.body);

  responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task attachment",
    data,
  );
});

export const findTaskAttachmentById = asyncHandler(async (req, res) => {
  const data = await findTaskAttachmentByIdService(req.params.id);

  responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task attachment",
    data,
  );
});

export const createTaskAttachment = asyncHandler(async (req, res) => {
  req.body.fileBuffer = req.file.buffer;

  const data = await createTaskAttachmentService(req.body);

  responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task attachment",
    data,
  );
});

export const deleteTaskAttachmentById = asyncHandler(async (req, res) => {
  const data = await deleteTaskAttachmentService(req.params.id);

  responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task attachment",
    data,
  );
});
