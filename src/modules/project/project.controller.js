import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { getPaginationParams } from "../../shared/utils/pagination.js";
import { responseSuccess } from "../../shared/utils/response.js";
import { createProjectService, deleteProjectService, findAllProjectService, findProjectByIdService, updateProjectService } from "./project.service.js";

export const findAllProject = asyncHandler(async (req, res) => {
    req.body = getPaginationParams(req)

    const data = await findAllProjectService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengambil data projek", data)
})

export const findProjectById = asyncHandler(async (req, res) => {
    const data = await findProjectByIdService(req.params.id)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengambil data projek", data)
})

export const createProject = asyncHandler(async (req, res) => {
    const data = await createProjectService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil membuat data projek", data)
})

export const updateProject = asyncHandler(async (req, res) => {
    const data = await updateProjectService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil mengubah data projek", data)
})

export const deleteProject = asyncHandler(async (req, res) => {
    const data = await deleteProjectService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil menghapus data projek", data)
})