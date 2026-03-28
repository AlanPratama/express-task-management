import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { getPaginationParams } from "../../shared/utils/pagination.js";
import { responseSuccess } from "../../shared/utils/response.js";
import {
  createTaskAssigneeService,
  deleteTaskAssigneeService,
  findAllTaskAssigneePaginationService,
  findTaskAssigneeByIdService,
  updateTaskAssigneeService,
} from "./task_assignee.service.js";

export const findAllTaskAssigneePagination = asyncHandler(async (req, res) => {
  req.body = getPaginationParams(req);

  const data = await findAllTaskAssigneePaginationService(req.body);

  return responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task assignee",
    data,
  );
});

export const findTaskAssigneeById = asyncHandler(async (req, res) => {
  const data = await findTaskAssigneeByIdService(req.params.id);

  return responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengambil data task assignee",
    data,
  );
});

export const createTaskAssignee = asyncHandler(async (req, res) => {
  const data = await createTaskAssigneeService(req.body);

  return responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil membuat data task assignee",
    data,
  );
});

export const updateTaskAssignee = asyncHandler(async (req, res) => {
  const data = await updateTaskAssigneeService(req.params.id, req.body);

  return responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil mengubah data task assignee",
    data,
  );
});

export const deleteTaskAssigneeById = asyncHandler(async (req, res) => {
  const data = await deleteTaskAssigneeService(req.params.id);

  return responseSuccess(
    res,
    HTTP_STATUS.OK,
    "Berhasil menghapus data task assignee",
    data,
  );
});
