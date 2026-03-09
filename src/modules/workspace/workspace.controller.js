import { HTTP_STATUS } from "../../shared/constants/http.constant.js"
import { asyncHandler } from "../../shared/utils/asyncHandler.js"
import { getPaginationParams } from "../../shared/utils/pagination.js"
import { responseSuccess } from "../../shared/utils/response.js"
import { createWorkspaceService, deleteWorkspaceService, findAllWorkspaceService, findWorkspaceByIdService, updateWorkspaceService } from "./workspace.service.js"

export const findAllWorkspace = asyncHandler(async (req, res) => {
    req.body = getPaginationParams(req)

    const data = await findAllWorkspaceService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
})

export const findWorkspaceById = asyncHandler(async (req, res) => {
    const data = await findWorkspaceByIdService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
})

export const createWorkspace = asyncHandler(async (req, res) => {
    const data = await createWorkspaceService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
})

export const updateWorkspace = asyncHandler(async (req, res) => {
    const data = await updateWorkspaceService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
})

export const deleteWorkspace = asyncHandler(async (req, res) => {
    const data = await deleteWorkspaceService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
})
