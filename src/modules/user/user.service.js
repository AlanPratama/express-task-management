import bcrypt from "bcrypt";
import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { generateError } from "../../shared/utils/error.js";
import { verifyToken } from "../../shared/utils/jwt.js";
import { UserConstant } from "./user.constant.js";
import { UserToDTO } from "./user.mapper.js";
import { findUserById, updateUser } from "./user.repository.js";

export const findUserByTokenService = async (token) => {
  const jwtUserDecode = verifyToken(token)?.data;

  const user = await findUserById(jwtUserDecode.id);

  if (!user)
    throw generateError(UserConstant.USER_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  return user;
};

export const findUserByIdService = async (id) => {
  const user = await findUserById(id);

  if (!user)
    throw generateError(UserConstant.USER_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  return user;
};

export const findUserByEmailService = async (email) => {
  const user = await findUserByEmail(email);

  if (!user)
    throw generateError(UserConstant.USER_NOT_FOUND_MSG, HTTP_STATUS.NOT_FOUND);

  return user;
};

const logicCpdateUser = async (id, data) => {
  const existUser = await findUserByIdService(id);

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

  return await logicCpdateUser(jwtUserDecode.id, data);
};

export const updateUserService = async (data) => {
  const { id } = data;

  return await logicCpdateUser(id, data);
};
