import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { getPaginationParams } from "../../shared/utils/pagination.js";
import { responseSuccess } from "../../shared/utils/response.js";
import { createWorkspaceMemberService, deleteWorkspaceMemberService, findAllWorkspaceMemberService, findWorkspaceMemberByIdService, updateWorkspaceMemberService } from "./workspace_member.service.js";

export const findAllWorkspaceMember = asyncHandler(async (req, res) => {
    req.body = getPaginationParams(req)

    const data = await findAllWorkspaceMemberService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil", data)
})

export const findWorkspaceMemberById = asyncHandler(async (req, res) => {
    const data = await findWorkspaceMemberByIdService(req.params.id)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil", data)
})

export const createWorkspaceMember = asyncHandler(async (req, res) => {
    const data = await createWorkspaceMemberService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil", data)
})

export const updateWorkspaceMember = asyncHandler(async (req, res) => {
    const data = await updateWorkspaceMemberService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil", data)
})

export const deleteWorkspaceMember = asyncHandler(async (req, res) => {
    const data = await deleteWorkspaceMemberService(req.params.id, req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil", data)
})