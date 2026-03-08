import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { getToken } from "../../shared/utils/jwt.js";
import { responseSuccess } from "../../shared/utils/response.js";
import { updateMyProfileUserService, updateUserService } from "./user.service.js";

export const updateMyProfileUser = asyncHandler(async (req, res) => {
    req.body.token = getToken(req)
    const data = await updateMyProfileUserService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil update data user", data)
})

export const updateUser = asyncHandler(async (req, res) => {
    const data = await updateUserService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil update data user", data)
})