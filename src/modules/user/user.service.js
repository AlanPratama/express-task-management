import { bcrypt } from "bcrypt";
import { generateError } from "../../shared/utils/error.js";
import { UserToDTO } from "./user.mapper.js";
import { findUserById, updateUser } from "./user.repository.js";
import { verifyToken } from "../../shared/utils/jwt.js";
import { HTTP_STATUS } from "../../shared/constants/http.constant.js";

const updateUser = async (id, data) => {
  const existUser = await findUserById(id);

  if (!existUser)
    throw generateError("User tidak ditemukan", HTTP_STATUS.NOT_FOUND);

  existUser.name = data.name;
  existUser.email = data.email;

  if (password) existUser.password = bcrypt.hashSync(password, 12);

  await updateUser(existUser);

  return UserToDTO(await updateUser(existUser));
};

export const updateMyProfileUserService = async (data) => {
  const { token } = data;
  const jwtUserDecode = verifyToken(token);

  if (!jwtUserDecode)
    throw generateError("Invalid Token", HTTP_STATUS.UNAUTHORIZED);

  return await updateUser(jwtUserDecode.id, data)
};

export const updateUserService = async (data) => {
  const { id } = data;

  return await updateUser(id, data)
};
