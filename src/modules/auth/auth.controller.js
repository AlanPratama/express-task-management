import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { responseSuccess } from "../../shared/utils/response.js";
import { getAuthenticatedUser, loginService, registerService } from './auth.service.js'


export const getMe = asyncHandler(async (req, res) => {
    const data = await getAuthenticatedUser(req.body)

    responseSuccess(res, 200, "Berhasil mengambil data User", data)
})

export const register = asyncHandler(async (req, res) => {
    const data = await registerService(req.body)

    responseSuccess(res, 200, "Berhasil register", data)
})

export const login = asyncHandler(async (req, res) => {
    const data = await loginService(req.body)

    responseSuccess(res, 200, "Berhasil login", data)
})