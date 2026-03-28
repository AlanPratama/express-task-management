import { HTTP_STATUS } from "../../shared/constants/http.constant";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { getPaginationParams } from "../../shared/utils/pagination";
import { responseSuccess } from "../../shared/utils/response";
import { createTaskService, deleteTaskService, findAllTaskPaginationService, findTaskByIdService, updateTaskService } from "./task.service";

export const findAllTask = asyncHandler(async (req, res) => {
req.body = getPaginationParams(req)

    const data = await findAllTaskPaginationService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengambil data task", data)
})

export const findTaskById = asyncHandler(async (req, res) => {
    const data = await findTaskByIdService(req.params.id)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengambil data task", data)
})

export const createTask = asyncHandler(async (req, res) => {
    const data = await createTaskService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil membuat data task", data)
})

export const updateTask = asyncHandler(async (req, res) => {
    const data = await updateTaskService(req.params.id, req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengubah data task", data)
})

export const deleteTask = asyncHandler(async (req, res) => {
    const data = await deleteTaskService(req.params.id)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil menghapus data task", data)
})