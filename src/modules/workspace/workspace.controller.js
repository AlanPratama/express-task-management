import { HTTP_STATUS } from "../../shared/constants/http.constant.js"
import { getToken, getTokenAndBindToRequest } from "../../shared/utils/jwt.js"
import { responseSuccess } from "../../shared/utils/response.js"
import { findAllWorkspaceService } from "./workspace.service.js"

export const findAllWorkspace = async (req, res) => {
    req.body = getTokenAndBindToRequest(req)

    const data = findAllWorkspaceService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
}

export const findWorkspaceById = async (req, res) => {
    req.body = getTokenAndBindToRequest(req)

    const data = findAllWorkspaceService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
}

export const createWorkspace = async (req, res) => {
    req.body = getTokenAndBindToRequest(req)

    const data = findAllWorkspaceService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
}

export const updateWorkspace = async (req, res) => {
    req.body = getTokenAndBindToRequest(req)

    const data = findAllWorkspaceService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
}

export const deleteWorkspace = async (req, res) => {
    req.body = getTokenAndBindToRequest(req)

    const data = findAllWorkspaceService(req.body)

    return responseSuccess(res, HTTP_STATUS.OK, "Berhasil workspace", data)
}
