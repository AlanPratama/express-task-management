import { HTTP_STATUS } from "../../shared/constants/http.constant";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { responseSuccess } from "../../shared/utils/response";
import { updateUserService } from "./user.service";

export const updateUser = asyncHandler(async (req, res) => {
    const data = await updateUserService(req.body)

    responseSuccess(res, HTTP_STATUS.OK, "Berhasil update data user", data)
})